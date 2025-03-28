const fs = require('fs');
const webhook = require('./webhooks');

const requestBody = JSON.stringify(JSON.parse(fs.readFileSync('src/fixtures/webhook_body.json', 'utf8')));
const requestBodyBuffer = Buffer.from(requestBody);

const webhookSecret = 'ED7D658C-D8EB-4941-948B-3973214F2D49';
const signatureHeader = '2693754819d3e32d7e8fcb13c729631f316c6de8dc1cf634d6527f1c07276e7e';

describe('.parse', () => {
  test('parses a string body with valid signature', () => {
    const result = webhook.parse(requestBody, webhookSecret, signatureHeader);

    expect(result.length).toBe(2);

    const firstEvent = result[0];
    expect(firstEvent.id).toBe('EV00BD05S5VM2T');
  });

  test('parses a buffer body with valid signature', () => {
    const result = webhook.parse(requestBodyBuffer, webhookSecret, signatureHeader);

    expect(result.length).toBe(2);

    const firstEvent = result[0];
    expect(firstEvent.id).toBe('EV00BD05S5VM2T');
  });

  test('parses a webhook response body with an invalid signature', () => {
    const badSignatureHeader = 'NOTVERYCONVINCING';

    expect(() => webhook.parse(requestBody, webhookSecret, badSignatureHeader)).toThrowError(
      webhook.InvalidSignatureError,
    );
  });
});
