#!/usr/bin/env node

'use strict';

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
  '/': (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
  '÷': (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
  divide: (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
  division: (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
};

function printUsage() {
  console.log(`Usage:
  node src\\calculator.js <operation> <number1> <number2>
  node src\\calculator.js <number1> <operation> <number2>

Operations:
  addition: +, add, addition
  subtraction: -, subtract, subtraction
  multiplication: *, x, ×, multiply, multiplication
  division: /, ÷, divide, division

Examples:
  node src\\calculator.js add 2 3
  node src\\calculator.js 10 ÷ 2`);
}

function parseCalculation(args) {
  if (args.length !== 3) {
    throw new Error('Expected exactly three arguments.');
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

function calculate(left, operation, right) {
  const handler = OPERATIONS[normalizeOperation(operation)];

  if (!handler) {
    throw new Error(`Unsupported operation: ${operation}`);
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
