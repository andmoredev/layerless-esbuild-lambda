import { calculate } from '../calculator.mjs';
import { expect } from 'chai';

describe('Calculator', () => {
  describe('calculate', () => {
    describe('addition', () => {
      it('Successfully adds multiple numbers', () => {
        const result = calculate('addition', [1, 2, 3, 4]);
        expect(result).to.equal(10);
      });

      it('Successfully adds a single number', () => {
        const result = calculate('addition', [5]);
        expect(result).to.equal(5);
      });

      it('Returns 0 for empty array', () => {
        const result = calculate('addition', []);
        expect(result).to.equal(0);
      });

      it('Successfully adds negative numbers', () => {
        const result = calculate('addition', [10, -5, -3]);
        expect(result).to.equal(2);
      });
    });

    describe('subtraction', () => {
      it('Successfully subtracts multiple numbers', () => {
        const result = calculate('subtraction', [10, 2, 3]);
        expect(result).to.equal(5);
      });

      it('Returns the single number for single element array', () => {
        const result = calculate('subtraction', [7]);
        expect(result).to.equal(7);
      });

      it('Returns 0 for empty array', () => {
        const result = calculate('subtraction', []);
        expect(result).to.equal(0);
      });
    });

    describe('multiplication', () => {
      it('Successfully multiplies multiple numbers', () => {
        const result = calculate('multiplication', [2, 3, 4]);
        expect(result).to.equal(24);
      });

      it('Returns 0 when multiplying with zero', () => {
        const result = calculate('multiplication', [5, 0, 3]);
        expect(result).to.equal(0);
      });

      it('Returns 1 for empty array', () => {
        const result = calculate('multiplication', []);
        expect(result).to.equal(1);
      });
    });

    describe('division', () => {
      it('Successfully divides two numbers', () => {
        const result = calculate('division', [10, 2]);
        expect(result).to.equal(5);
      });

      it('Throws error for too many numbers', () => {
        expect(() => calculate('division', [10, 2, 5])).to.throw('Division operation supports exactly two numbers only');
      });

      it('Throws error for too few numbers', () => {
        expect(() => calculate('division', [10])).to.throw('Division operation requires exactly two numbers');
      });

      it('Throws error for division by zero', () => {
        expect(() => calculate('division', [10, 0])).to.throw('Division by zero is not allowed');
      });
    });

    describe('invalid operation', () => {
      it('Throws error for invalid operation type', () => {
        expect(() => calculate('modulo', [10, 3])).to.throw('Invalid operation type. Supported operations are: addition, subtraction, multiplication, division');
      });
    });
  });
});
