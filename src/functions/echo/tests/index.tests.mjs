
import * as app from '../index.mjs';
import { expect } from 'chai';
import * as apigateway from '../../shared/apigateway.mjs';
import * as sinon from 'sinon';

describe('Echo', () => {
  describe('handler', () => {
    it('Successfully', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          hello: 'world'
        })
      });

      expect(response.statusCode).to.equal(200);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('hello', 'world');
    });

    it('500 - Unhandled error', async () => {
      const response = await app.handler();
      expect(response.statusCode).to.equal(500);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Something went wrong!');
    });

    it('Try sinon', async () => {
      const getResponseStub = sinon.stub(apigateway, 'getResponse');

      expect(response.statusCode).to.equal(500);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Something went wrong!');
      expect(getResponseStub.calledOnce).to.be.true;
    });
  });
});