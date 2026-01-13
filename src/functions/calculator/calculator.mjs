/**
 * Calculator module with core calculation functions
 */

/**
 * Add all numbers in the array
 * @param {number[]} numbers - Array of numbers to add
 * @returns {number} Sum of all numbers
 */
const add = (numbers) => {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0);
};

/**
 * Subtract subsequent numbers from the first number
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Result of subtraction
 */
const subtract = (numbers) => {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return numbers[0];
  return numbers.slice(1).reduce((result, num) => result - num, numbers[0]);
};

/**
 * Multiply all numbers in the array
 * @param {number[]} numbers - Array of numbers to multiply
 * @returns {number} Product of all numbers
 */
const multiply = (numbers) => {
  if (numbers.length === 0) return 1;
  return numbers.reduce((product, num) => product * num, 1);
};

/**
 * Divide the first number by the second number
 * @param {number[]} numbers - Array containing exactly two numbers
 * @returns {number} Result of division
 * @throws {Error} If array doesn't contain exactly 2 numbers or if dividing by zero
 */
const divide = (numbers) => {
  if (numbers.length < 2) {
    throw new Error('Division operation requires exactly two numbers');
  }
  if (numbers.length > 2) {
    throw new Error('Division operation supports exactly two numbers only');
  }
  if (numbers[1] === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return numbers[0] / numbers[1];
};

/**
 * Main calculate function that routes to appropriate operation
 * @param {string} operation - The operation type (addition, subtraction, multiplication, division)
 * @param {number[]} numbers - Array of numbers to perform operation on
 * @returns {number} Result of the calculation
 * @throws {Error} If operation type is invalid
 */
export const calculate = (operation, numbers) => {
  switch (operation) {
    case 'addition':
      return add(numbers);
    case 'subtraction':
      return subtract(numbers);
    case 'multiplication':
      return multiply(numbers);
    case 'division':
      return divide(numbers);
    default:
      throw new Error('Invalid operation type. Supported operations are: addition, subtraction, multiplication, division');
  }
};
