#!/usr/bin/env node

'use strict';

function divide(left, right) {
  if (right === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error('Cannot modulo by zero.');
  }

  return left % right;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error('Cannot calculate square root of a negative number.');
  }

  return Math.sqrt(value);
}

const OPERATIONS = {
  // Addition: add two numbers.
  '+': (left, right) => left + right,
  add: (left, right) => left + right,
  addition: (left, right) => left + right,

  // Subtraction: subtract the second number from the first.
  '-': (left, right) => left - right,
  subtract: (left, right) => left - right,
  subtraction: (left, right) => left - right,

  // Multiplication: multiply two numbers.
  '*': (left, right) => left * right,
  x: (left, right) => left * right,
  '×': (left, right) => left * right,
  multiply: (left, right) => left * right,
  multiplication: (left, right) => left * right,

  // Division: divide the first number by the second.
  '/': divide,
  '÷': divide,
  divide,
  division: divide,

  // Modulo: return the remainder of dividing the first number by the second.
  '%': modulo,
  mod: modulo,
  modulo,

  // Exponentiation: raise the first number to the power of the second.
  '^': (left, right) => left ** right,
  '**': (left, right) => left ** right,
  pow: (left, right) => left ** right,
  power: (left, right) => left ** right,
  exponentiation: (left, right) => left ** right,

  // Square root: return the non-negative square root of a number.
  sqrt: squareRoot,
  '√': squareRoot,
};

const UNARY_OPERATIONS = new Set(['sqrt', '√']);

function printUsage() {
  console.log(`Usage:
  node src\\calculator.js <operation> <number1> <number2>
  node src\\calculator.js <number1> <operation> <number2>
  node src\\calculator.js <operation> <number>
  node src\\calculator.js <number> <operation>

Operations:
  addition: +, add, addition
  subtraction: -, subtract, subtraction
  multiplication: *, x, ×, multiply, multiplication
  division: /, ÷, divide, division
  modulo: %, mod, modulo
  exponentiation: ^, **, pow, power, exponentiation
  square root: sqrt, √

Examples:
  node src\\calculator.js add 2 3
  node src\\calculator.js 10 ÷ 2
  node src\\calculator.js sqrt 81`);
}

function parseCalculation(args) {
  if (args.length === 2) {
    const [first, second] = args;
    const firstAsNumber = Number(first);
    const secondAsNumber = Number(second);

    if (isUnaryOperation(first) && Number.isFinite(secondAsNumber)) {
      return {
        left: secondAsNumber,
        operation: normalizeOperation(first),
      };
    }

    if (isUnaryOperation(second) && Number.isFinite(firstAsNumber)) {
      return {
        left: firstAsNumber,
        operation: normalizeOperation(second),
      };
    }

    throw new Error('Provide one valid number and one supported unary operation.');
  }

  if (args.length !== 3) {
    throw new Error('Expected either two or three arguments.');
  }

  const [first, second, third] = args;
  const firstAsNumber = Number(first);
  const secondAsNumber = Number(second);
  const thirdAsNumber = Number(third);

  if (Number.isFinite(firstAsNumber) && Number.isFinite(thirdAsNumber)) {
    return {
      left: firstAsNumber,
      operation: normalizeOperation(second),
      right: thirdAsNumber,
    };
  }

  if (Number.isFinite(secondAsNumber) && Number.isFinite(thirdAsNumber)) {
    return {
      left: secondAsNumber,
      operation: normalizeOperation(first),
      right: thirdAsNumber,
    };
  }

  throw new Error('Provide two valid numbers and one supported operation.');
}

function normalizeOperation(operation) {
  return operation.toLowerCase();
}

function isUnaryOperation(operation) {
  return UNARY_OPERATIONS.has(normalizeOperation(operation));
}

function calculate(left, operation, right) {
  const normalizedOperation = normalizeOperation(operation);
  const handler = OPERATIONS[normalizedOperation];

  if (!handler) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  if (isUnaryOperation(normalizedOperation)) {
    return handler(left);
  }

  return handler(left, right);
}

function main(args) {
  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }

  const { left, operation, right } = parseCalculation(args);
  console.log(calculate(left, operation, right));
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printUsage();
    process.exitCode = 1;
  }
}

module.exports = {
  calculate,
};
