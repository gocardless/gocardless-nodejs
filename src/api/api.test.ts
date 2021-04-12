import nock from 'nock';

import { Api } from './api';
import { Environments } from '../constants';
import * as GoCardlessErrors from '../errors';

describe(".request", () => {
  const token = "<TOKEN>";

  beforeAll(() => {
    nock.disableNetConnect();
  })

  afterEach(() => {
    nock.cleanAll();
  })

  describe("API environments", () => {
    test("when in Sandbox environment", async () => {
      const check = nock("https://api-sandbox.gocardless.com").get("/").reply(200, {});

      const api = new Api(token, Environments.Sandbox, {});
      const params = { path: "/", method: "get", fetch: null }

      await api.request(params);

      expect(check.isDone()).toEqual(true);
    });

    test("when in Live environment", async () => {
      const check = nock("https://api.gocardless.com").get("/").reply(200, {});

      const api = new Api(token, Environments.Live, {});

      const params = { path: "/", method: "get", fetch: null }

      await api.request(params);

      expect(check.isDone()).toEqual(true);
    });
  });

  describe("testing API requests", () => {
    const environment = Environments.Live;

    describe("API errors", () => {
      describe("MalformedResponseError", () => {
        it("throws the correct error", async () => {
          const check = nock("https://api.gocardless.com").
          get("/").
            reply(
              200,
              "oh no, we've responded 200 but without valid JSON,{",
              { 'x-request-id': 'SOME_REQUEST_ID' }
          );

          const params = { path: "/", method: "get", fetch: null }
          const api = new Api(token, environment, {});

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.MalformedResponseError);
          expect(e.requestId).toEqual('SOME_REQUEST_ID');

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("IdempotentCreationConflictError", () => {
        it("raises when raiseOnIdempotencyConflict", async () => {
          const check = nock("https://api.gocardless.com").
              post("/").
              replyWithFile(
                409,
                __dirname + "/../fixtures/idempotency_conflict.json",
                { 'Content-Type': 'application/json' }
              );

          const params = { path: "/", method: "post", fetch: null }
          const api = new Api(token, environment, { raiseOnIdempotencyConflict: true });

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.IdempotentCreationConflictError);
          expect(e.requestId).toEqual('HARDCODED_REQUEST_ID');
          expect(e.conflictingResourceId).toEqual('PM1234');

          expect(check.isDone()).toEqual(true);
        });

        it("fetchs when not raiseOnIdempotencyConflict", async () => {
          const check = nock("https://api.gocardless.com").
              post("/").
              replyWithFile(
                409,
                __dirname + "/../fixtures/idempotency_conflict.json",
                { 'Content-Type': 'application/json' }
              )

          const mockFetch = jest.fn();
          const params = { path: "/", method: "post", fetch: mockFetch }
          const api = new Api(token, environment, { raiseOnIdempotencyConflict: false });

          await api.request(params);

          expect(mockFetch).toHaveBeenCalledWith("PM1234");

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("ValidationFailedError", () =>{
        it("throws the correct error", async () => {
          const check = nock("https://api.gocardless.com").
            post("/").
            replyWithFile(
              422,
              __dirname + "/../fixtures/validation_failed.json",
              { 'Content-Type': 'application/json' }
          );

          const params = { path: "/", method: "post", fetch: null }
          const api = new Api(token, environment, {});

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.ValidationFailedError);
          expect(e.requestId).toEqual('HARDCODED_REQUEST_ID');
          expect(e.toString()).
            toEqual("Validation failed (amount is greater than the permitted scheme maximum)")

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("InvalidApiUsageError", () =>{
        it("throws the correct error", async () => {
          const check = nock("https://api.gocardless.com").
            post("/").
            replyWithFile(
              422,
              __dirname + "/../fixtures/invalid_api_usage.json",
              { 'Content-Type': 'application/json' }
          );

          const params = { path: "/", method: "post", fetch: null }
          const api = new Api(token, environment, {});

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.InvalidApiUsageError);
          expect(e.requestId).toEqual('HARDCODED_REQUEST_ID');

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("InvalidStateError", () =>{
        it("throws the correct error", async () => {
          const check = nock("https://api.gocardless.com").
            post("/").
            replyWithFile(
              422,
              __dirname + "/../fixtures/invalid_state.json",
              { 'Content-Type': 'application/json' }
            );

          const params = { path: "/", method: "post", fetch: null }
          const api = new Api(token, environment, {});

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.InvalidStateError);
          expect(e.requestId).toEqual('HARDCODED_REQUEST_ID');

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("GoCardlessInternalError", () =>{
        it("throws the correct error", async () => {
          const check = nock("https://api.gocardless.com").
            get("/").
            replyWithFile(
              500,
              __dirname + "/../fixtures/gocardless_internal_error.json",
              { 'Content-Type': 'application/json' }
            ).persist();

          const params = { path: "/", method: "get", fetch: null }
          const api = new Api(token, environment, {});

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.GoCardlessInternalError);
          expect(e.requestId).toEqual('HARDCODED_REQUEST_ID');

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("AuthenticationError", () =>{
        it("throws the correct error", async () => {
          const check = nock("https://api.gocardless.com").
            get("/").
            replyWithFile(
              401,
              __dirname + "/../fixtures/unauthorized.json",
              { 'Content-Type': 'application/json' }
          );

          const params = { path: "/", method: "get", fetch: null }
          const api = new Api(token, environment, {});

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.AuthenticationError);
          expect(e.requestId).toEqual('HARDCODED_REQUEST_ID');

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("PermissionsError", () => {
        it("throws the correct error", async () => {
          const check = nock("https://api.gocardless.com").
            get("/").
            replyWithFile(
              403,
              __dirname + "/../fixtures/insufficent_permissions.json",
              { 'Content-Type': 'application/json' }
          );

          const params = { path: "/", method: "get", fetch: null }
          const api = new Api(token, environment, {});

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.PermissionsError);
          expect(e.requestId).toEqual('HARDCODED_REQUEST_ID');

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("RateLimitError", () => {
        it("throws the correct error", async () => {
          const check = nock("https://api.gocardless.com").
            get("/").
            replyWithFile(
              429,
              __dirname + "/../fixtures/rate_limit_exceeded.json",
              { 'Content-Type': 'application/json' }
            ).persist();

          const params = { path: "/", method: "get", fetch: null }
          const api = new Api(token, environment, {});

          let e;
          try {
            await api.request(params);
          } catch (err) {
            e = err;
          }
          expect(e).toBeInstanceOf(GoCardlessErrors.RateLimitError);

          expect(check.isDone()).toEqual(true);
        });
      });
    });

    describe("Successful requests", () => {
      let api;

      beforeEach(() => {
        api = new Api(token, environment, {});
      });

      describe("making a POST request", () => {
        test("provided with an idempotency key", async () => {
          const idempotencyKey = "<USER_PROVIDED_IDEMPOTENCY_KEY>";
          const requestParameters = { key: "value" }

          const check = nock("https://api.gocardless.com", {
            reqheaders: {
              'Idempotency-Key': idempotencyKey,
            },
          }).
            post("/", { data: requestParameters }).
            reply(200, {});

          const params = {
            path: "/",
            method: "post",
            requestParameters,
            idempotencyKey,
            fetch: null,
          }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });

        test("without a provided idempotency key", async () => {
          const requestParameters = { key: "value" }
          const check = nock("https://api.gocardless.com", {
            reqheaders: {
              'Idempotency-Key': key => key.length == 36,
            },
          }).
            post("/", { data: requestParameters }).
            reply(200, {});

          const params = {
            path: "/",
            method: "post",
            requestParameters,
            fetch: null,
          }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });

        test("provided with a payloadKey", async () => {
          const requestParameters = { key: "value" }
          const check = nock("https://api.gocardless.com").
            post("/", { some_payload_key: requestParameters }).
            reply(200, {});

          const params = {
            path: "/",
            method: "post",
            requestParameters,
            payloadKey: "some_payload_key",
            fetch: null,
          }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("making a LIST request", () => {
        test("with request parameters", async () => {
          const check = nock("https://api.gocardless.com").
            get("/?key=value&foo=bar%2Cbaz").
            reply(200, {});

          const params = {
            path: "/",
            method: "get",
            requestParameters: { key: "value", foo: ["bar", "baz"] },
            fetch: null
          }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });

        test("with nested request parameters", async () => {
          const check = nock("https://api.gocardless.com").
            get("/?key=value&foo%5Bbar%5D=baz&foo%5Bwibble%5D=wobble").
            reply(200, {});

          const params = {
            path: "/",
            method: "get",
            requestParameters: { key: "value", foo: { bar: "baz", wibble: "wobble" } },
            fetch: null
          }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });

        test("without request parameters", async () => {
          const check = nock("https://api.gocardless.com").
            get("/").
            reply(200, {});

          const params = { path: "/", method: "get", fetch: null }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("making a GET request", () => {
        test("with URL parameters", async () => {
          const check = nock("https://api.gocardless.com").
            get("/resource/ID123").
            reply(200, {});

          const urlParameters = [{ key: "identity", value: "ID123" }];
          const params = {
            path: "/resource/:identity",
            method: "get",
            urlParameters,
            fetch: null,
          }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });

        it("populates all required headers", async () => {
          const check = nock("https://api.gocardless.com", {
            reqheaders: {
              'accept': 'application/json',
              'authorization': /Bearer/,
              'gocardless-version': /\d{4}-\d{2}-\d{1,2}/,
              'gocardless-client-version': /\d+\.\d+\.\d+/,
              'gocardless-client-library': 'gocardless-nodejs',
              'user-agent': s => !!s,
            }
          }).
            get("/").
            reply(200, {});

          const params = { path: "/", method: "get", fetch: null }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("making a PUT request", () => {
        test("with URL parameters and request body", async () => {
          const requestParameters = { key: "value" }

          const check = nock("https://api.gocardless.com").
            put("/resource/ID123", { data: requestParameters }).
            reply(200, {});

          const urlParameters = [{ key: "identity", value: "ID123" }];
          const params = {
            path: "/resource/:identity",
            method: "put",
            urlParameters,
            requestParameters,
            fetch: null,
          }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });
      });

      describe("making a DELETE request", () => {
        test("with valid URL parameters", async () => {
          const check = nock("https://api.gocardless.com").
            delete("/resource/ID123").
            reply(200, {});

          const urlParameters = [{ key: "identity", value: "ID123" }];
          const params = {
            path: "/resource/:identity",
            method: "delete",
            urlParameters,
            fetch: null,
          }

          await api.request(params);

          expect(check.isDone()).toEqual(true);
        });
      });
    });
  })
});
