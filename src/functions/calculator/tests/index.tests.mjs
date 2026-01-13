import * as app from '../index.mjs';
import { expect } from 'chai';

describe('Calculator', () => {
  describe('handler', () => {
    it('Successfully performs addition', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          operation: 'addition',
          numbers: [1, 2, 3]
        })
      });

      expect(response.statusCode).to.equal(200);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('operation', 'addition');
      expect(body).to.have.property('numbers').that.deep.equals([1, 2, 3]);
      expect(body).to.have.property('result', 6);
    });

    it('Successfully performs subtraction', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          operation: 'subtraction',
          numbers: [10, 3, 2]
        })
      });

      expect(response.statusCode).to.equal(200);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('operation', 'subtraction');
      expect(body).to.have.property('numbers').that.deep.equals([10, 3, 2]);
      expect(body).to.have.property('result', 5);
    });

    it('Successfully performs multiplication', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          operation: 'multiplication',
          numbers: [2, 3, 4]
        })
      });

      expect(response.statusCode).to.equal(200);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('operation', 'multiplication');
      expect(body).to.have.property('numbers').that.deep.equals([2, 3, 4]);
      expect(body).to.have.property('result', 24);
    });

    it('Successfully performs division', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          operation: 'division',
          numbers: [10, 2]
        })
      });

      expect(response.statusCode).to.equal(200);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('operation', 'division');
      expect(body).to.have.property('numbers').that.deep.equals([10, 2]);
      expect(body).to.have.property('result', 5);
    });

    it('Returns 400 for invalid operation type', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          operation: 'modulo',
          numbers: [10, 3]
        })
      });

      expect(response.statusCode).to.equal(400);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Invalid operation type. Supported operations are: addition, subtraction, multiplication, division');
    });

    it('Returns 400 for division with more than 2 numbers', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          operation: 'division',
          numbers: [10, 2, 5]
        })
      });

      expect(response.statusCode).to.equal(400);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Division operation supports exactly two numbers only');
    });

    it('Returns 400 for division with fewer than 2 numbers', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          operation: 'division',
          numbers: [10]
        })
      });

      expect(response.statusCode).to.equal(400);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Division operation requires exactly two numbers');
    });

    it('Returns 400 for division by zero', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          operation: 'division',
          numbers: [10, 0]
        })
      });

      expect(response.statusCode).to.equal(400);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Division by zero is not allowed');
    });

    it('Returns 500 for malformed JSON input', async () => {
      const response = await app.handler({
        body: 'invalid json'
      });

      expect(response.statusCode).to.equal(500);
      expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Something went wrong!');
    });
  });
});
