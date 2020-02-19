const fs = require('fs');
const webhook = require('../webhooks');
const request_body = JSON.stringify(JSON.parse(fs.readFileSync('src/__tests__/fixtures/webhook_body.json', 'utf8')));
const webhook_secret = 'ED7D658C-D8EB-4941-948B-3973214F2D49';
const signature_header = '2693754819d3e32d7e8fcb13c729631f316c6de8dc1cf634d6527f1c07276e7e';
describe('.parse', () => {
    test('parses a webhook response body with valid signature', () => {
        result = webhook.parse(request_body, webhook_secret, signature_header);
        expect(result.length).toBe(2);
        const first_event = result[0];
        expect(first_event.id).toBe('EV00BD05S5VM2T');
    });
    test('parses a webhook response body with an invalid signature', () => {
        const bad_signature_header = 'NOTVERYCONVINCING';
        expect(() => webhook.parse(request_body, webhook_secret, bad_signature_header)).toThrowError(webhook.InvalidSignatureError);
    });
});
//# sourceMappingURL=webhooks.test.js.map