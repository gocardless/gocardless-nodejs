import got from 'got';

import { Api } from "./Api";
import { Environments } from "../Constants";

jest.mock("got", () => {
  return jest.fn().mockReturnValue({
    body: {},
    headers: {},
    statusCode: '200',
    statusMessage: "",
    url: ""
  });
});


describe(".request", () => {
  let token = "<TOKEN>";

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe("API environments", () => {
    test("when in Sandbox environment", async () => {
      const sandboxApi = new Api(token, Environments.Sandbox, {});

      const params = {
        path: '/resource',
        method: 'get',
        urlParameters: [],
        requestParameters: {},
        payloadKey: null,
        fetch: null,
      }
      const response = await sandboxApi.request(params);

      const calls = (got as any).mock.calls

      expect(calls[0][1].prefixUrl).toEqual("https://api-sandbox.gocardless.com")
    });

    test("when in Live environment", async () => {
      const liveApi = new Api(token, Environments.Live, {});

      const requestParams = {
        path: '/resource',
        method: 'get',
        urlParameters: [],
        requestParameters: {},
        payloadKey: null,
        fetch: null,
      }
      const response = await liveApi.request(requestParams);

      const calls = (got as any).mock.calls

      expect(calls[0][1].prefixUrl).toEqual("https://api.gocardless.com")
    });
  });

  describe("testing API requests", () => {
    let api;
    let environment = Environments.Sandbox;
    beforeEach(() => {
      api = new Api(token, environment, {});
    });

    describe("making a POST request", () => {
      test("with an idempotency key", async () => {
        const idempotencyKey = "<UNIQUE_IDEMPOTENCY_KEY>";
        const requestParameters = { key: "value", foo: { bar: "baz", wibble: "wobble" }}
        const params = {
          path: "/resource",
          method: "post",
          urlParameters: [],
          requestParameters,
          payloadKey: null,
          idempotencyKey,
          fetch: null,
        }

        const response = await api.request(params);

        const headers = (got as any).mock.calls[0][1].headers
        expect(headers["Idempotency-Key"]).toEqual(idempotencyKey);

        const requestBody = (got as any).mock.calls[0][1].json;
        expect(requestBody).toEqual({ data: requestParameters })
      });

      describe("idempotency conflict", () => {
        let idempotencyKey: string;
        beforeEach(() => {
          api.isIdempotencyConflict = jest.fn().mockReturnValue(true);

          idempotencyKey = "<UNIQUE_IDEMPOTENCY_KEY>";
          const errorBody: any = {
            response: {
              body: {
                error: {
                  errors: [{ links: { conflicting_resource_id: idempotencyKey }}]
                }
              }
            }
          };

          (got as any).mockImplementationOnce(() => { throw errorBody })
        });

        test("with an idempotency key and `raise_on_idempotency_conflict` toggled on", async () => {
          api.raiseOnIdempotencyConflict = true;

          const idempotencyCallback = jest.fn();
          const requestParameters = { key: "value", foo: { bar: "baz", wibble: "wobble" }}
          const params = {
            path: "/resource",
            method: "post",
            urlParameters: [],
            requestParameters,
            payloadKey: null,
            idempotencyKey,
            fetch: idempotencyCallback,
          }

          let error;
          try {
            await api.request(params);
          } catch (exc) {
            error = exc
          }

          // Ensure that we're throwing the correct error.
          expect(error).toBeTruthy();
          expect(error.constructor.name).toEqual('GoCardlessException');
          expect(error.errors[0].links.conflicting_resource_id).toEqual(idempotencyKey)

          // We want to ensure that the correct idempotency key was used in the first request.
          const headers = (got as any).mock.calls[0][1].headers
          expect(headers["Idempotency-Key"]).toEqual(idempotencyKey);

          // We want to ensure that the callback function was not thrown. 
          expect(idempotencyCallback).not.toHaveBeenCalled();

          // Ensure the correct request body is still being sent.
          const requestBody = (got as any).mock.calls[0][1].json;
          expect(requestBody).toEqual({ data: requestParameters })
        });

        test("with an idempotency key and `raise_on_idempotency_conflict` toggled off", async() => {
          api.raiseOnIdempotencyConflict = false;

          const idempotencyCallback = jest.fn();
          const requestParameters = { key: "value", foo: { bar: "baz", wibble: "wobble" }}
          const params = {
            path: "/resource",
            method: "post",
            urlParameters: [],
            requestParameters,
            payloadKey: null,
            idempotencyKey,
            fetch: idempotencyCallback,
          }

          const response = await api.request(params);

          const headers = (got as any).mock.calls[0][1].headers
          expect(headers["Idempotency-Key"]).toEqual(idempotencyKey);

          expect(idempotencyCallback).toHaveBeenCalledWith(idempotencyKey)

          const requestBody = (got as any).mock.calls[0][1].json;
          expect(requestBody).toEqual({ data: requestParameters })
        });
      });

      test("without an idempotency key", async () => {
        // If no idempotency key is specified, we generate our own using the `uuid` module.
        api.generateIdempotencyKey = jest.fn().mockReturnValue("<GENERATED_IDEMPOTENCY_KEY>");

        const requestParameters = { key: "value", foo: { bar: "baz", wibble: "wobble" }}
        const params = {
          path: "/resource",
          method: "post",
          urlParameters: [],
          requestParameters,
          payloadKey: null,
          fetch: null,
        }

        const response = await api.request(params);

        const headers = (got as any).mock.calls[0][1].headers
        expect(headers["Idempotency-Key"]).toEqual("<GENERATED_IDEMPOTENCY_KEY>");

        const requestBody = (got as any).mock.calls[0][1].json;
        expect(requestBody).toEqual({ data: requestParameters })
      });
    });

    describe("making a LIST request", () => {
      test("with request parameters", async () => {
        const params = {
          path: "/resource",
          method: "get",
          urlParameters: [],
          requestParameters: { key: "value", foo: "bar" },
          payloadKey: null,
          fetch: null,
        }

        const response = await api.request(params);

        // Ensure that we're parsing the given request parameters, and formatting them
        // correctly into the request search parameters.
        const searchParams = (got as any).mock.calls[0][1].searchParams;

        expect(searchParams.toString()).toEqual("key=value&foo=bar")
      });

      test("with nested request parameters", async () => {
        const params = {
          path: "/resource",
          method: "get",
          urlParameters: [],
          requestParameters: { key: "value", foo: { bar: "baz", wibble: "wobble" } },
          payloadKey: null,
          fetch: null,
        }

        const response = await api.request(params);

        // Ensure that nested search parameters are formatted properly, in the following
        // format: `parent_key[nested_key]=nested_value`.
        const searchParams = (got as any).mock.calls[0][1].searchParams;

        expect(
          searchParams.toString()
        ).toEqual("key=value&foo%5Bbar%5D=baz&foo%5Bwibble%5D=wobble")
      });

      test("without request parameters", async () => {
        const params = {
          path: "/resource",
          method: "get",
          urlParameters: [],
          requestParameters: {},
          payloadKey: null,
          fetch: null,
        }

        const response = await api.request(params);

        const searchParams = (got as any).mock.calls[0][1].searchParams;

        expect(searchParams.toString()).toEqual("")
      });
    });

    describe("making a GET request", () => {
      test("with valid URL parameters", async () => {
        const urlParameters = [{ key: "identity", value: "<RESOURCE_ID>" }];
        const params = {
          path: "/resource/:identity",
          method: "get",
          urlParameters,
          requestParameters: {},
          payloadKey: null,
          fetch: null,
        }

        const response = await api.request(params);

        // Ensure that we're parsing the URL parameter object and formatting the request
        // path correctly.
        const searchPath = (got as any).mock.calls[0][0];

        expect(searchPath).toEqual("/resource/<RESOURCE_ID>")
      });
    });

    describe("making a PUT request", () => {
      test("with valid URL parameters, search paramter, and request body", async () => {
        const urlParameters = [{ key: "identity", value: "<RESOURCE_ID>" }];
        const requestParameters = { key: "value", foo: { bar: "baz", wibble: "wobble" }}
        const params = {
          path: "/resource/:identity",
          method: "put",
          urlParameters,
          requestParameters,
          payloadKey: null,
          fetch: null,
        }

        const response = await api.request(params);

        const searchPath = (got as any).mock.calls[0][0];
        expect(searchPath).toEqual("/resource/<RESOURCE_ID>")

        const searchParams = (got as any).mock.calls[0][1].searchParams;
        expect(searchParams).toEqual(undefined)

        const requestBody = (got as any).mock.calls[0][1].json;
        expect(requestBody).toEqual({ data: requestParameters })
      });
    });

    describe("making a DELETE request", () => {
      test("with valid URL parameters", async () => {
        const urlParameters = [{ key: "identity", value: "<RESOURCE_ID>" }];
        const params = {
          path: "/resource/:identity",
          method: "delete",
          urlParameters,
          payloadKey: null,
          fetch: null,
        }

        const response = await api.request(params);

        const searchPath = (got as any).mock.calls[0][0];
        expect(searchPath).toEqual("/resource/<RESOURCE_ID>")

        const searchParams = (got as any).mock.calls[0][1].searchParams;
        expect(searchParams).toEqual(undefined)
      });
    });
  })
});
