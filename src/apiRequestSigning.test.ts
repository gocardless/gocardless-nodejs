import fs from 'node:fs';
import { ApiRequestSignatureHelper, ApiRequestSigningOptionsInternal } from './apiRequestSigning';

const privateKeyPem = fs.readFileSync('src/fixtures/private_key.pem', 'utf8');
const publicKeyPem = fs.readFileSync('src/fixtures/public_key.pem', 'utf8');
const SIG_PATTERN = /^sig-1=:(.+):$/;

const commonOpts = () => ({
  apiRequestSigningOptions: {
    privateKeyPem,
    publicKeyId: 'PublicKeyId',
    publicKeyPem,
  } as ApiRequestSigningOptionsInternal,
  host: 'https://api.example.com',
  requestPath: '/test',
  httpMethod: 'GET',
  contentDigest: null,
  contentLength: 123,
  created: '123',
  nonce: 'nonce',
  contentType: 'application/json',
});

describe('.new', () => {
  describe('no content', () => {
    test('should generate the signature header', () => {
      const opts = commonOpts();

      const signer = new ApiRequestSignatureHelper(opts);

      // @ts-ignore
      const signature = signer._gcSignature;
      expect(signature).toMatch(SIG_PATTERN);
    });
    test('should populate the signature input header', () => {
      const opts = commonOpts();

      const signer = new ApiRequestSignatureHelper(opts);

      // @ts-ignore
      const signatureInput = signer._gcSignatureInput;
      expect(signatureInput).toBe(
        `sig-1=("@method" "@authority" "@request-target");keyid="PublicKeyId";created=123;nonce="nonce"`,
      );
    });
  });
  describe('with content', () => {
    test('should generate the signature header', () => {
      const opts = commonOpts();
      opts.contentDigest = 'digest';

      const signer = new ApiRequestSignatureHelper(opts);

      // @ts-ignore
      const signature = signer._gcSignature;
      expect(signature).toMatch(SIG_PATTERN);
    });
    test('should populate the signature input header', () => {
      const opts = commonOpts();
      opts.contentDigest = 'digest';

      const signer = new ApiRequestSignatureHelper(opts);

      // @ts-ignore
      const signatureInput = signer._gcSignatureInput;
      expect(signatureInput).toBe(
        `sig-1=("@method" "@authority" "@request-target" "content-digest" "content-type" "content-length");keyid="PublicKeyId";created=123;nonce="nonce"`,
      );
    });
  });
  describe('with test mode', () => {
    test("should generate the signature header with 'SIG' in test mode", () => {
      const opts = commonOpts();
      opts.apiRequestSigningOptions.testMode = true;

      const signer = new ApiRequestSignatureHelper(opts);

      // @ts-ignore
      const signature = signer._gcSignature;
      expect(signature).toBe('sig-1=:SIG:');
    });
  });
  describe('with public key provided', () => {
    describe('when public key is for the private key', () => {
      test('should not error', () => {
        const opts = commonOpts();
        opts.apiRequestSigningOptions.publicKeyPem = publicKeyPem;

        expect(() => new ApiRequestSignatureHelper(opts)).not.toThrow();
      });
    });
    describe('when signing failed', () => {
      afterEach(() => jest.restoreAllMocks());
      test('should throw an error', () => {
        const opts = commonOpts();
        opts.apiRequestSigningOptions.publicKeyPem = publicKeyPem;
        jest
          .spyOn(ApiRequestSignatureHelper.prototype as any, 'signStringSecp521r1')
          .mockImplementation((_a: any, _b: any) => 'invalid-signature');

        expect(() => new ApiRequestSignatureHelper(opts)).toThrow('Signature verification failed');
      });
    });
  });
});

describe('.getSignature', () => {
  test('returns the signature header', () => {
    const signer = new ApiRequestSignatureHelper(commonOpts());
    // @ts-ignore
    const signature = signer._gcSignature;

    const gcSignatureHeader = signer.getGcSignature();

    expect(gcSignatureHeader).toBe(signature);
  });
});
describe('.getGcSignatureInput', () => {
  test('returns the signature input header', () => {
    const signer = new ApiRequestSignatureHelper(commonOpts());
    // @ts-ignore
    const signatureInput = signer._gcSignatureInput;

    const gcSignatureHeader = signer.getGcSignatureInput();

    expect(gcSignatureHeader).toBe(signatureInput);
  });
});
describe('.getSha256DigestHeader', () => {
  test('wraps digest into expected format', () => {
    const digest = 'digest';

    const header = ApiRequestSignatureHelper.getSha256DigestHeader(digest);

    expect(header).toBe(`sha256=:${digest}:`);
  });
});
describe('getSha256Digest', () => {
  test('generates a sha256 digest of a string', () => {
    const content = 'test content';

    const digest = ApiRequestSignatureHelper.getSha256Digest(content);

    expect(digest).toBe('auinVVUgn9bEQVfArtgBbnY/9DWhnPGG92hjFAFD/3I=');
  });
  describe('given non-string content', () => {
    test('throws TypeError', () => {
      expect(() => ApiRequestSignatureHelper.getSha256Digest(123 as any)).toThrow(TypeError);
    });
  });
});
