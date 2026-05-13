'use strict';

const {
  calculate,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

describe('calculator basic operations', () => {
  test('adds numbers using the image example 2 + 3', () => {
    expect(calculate(2, '+', 3)).toBe(5);
  });

  test('subtracts numbers using the image example 10 - 4', () => {
    expect(calculate(10, '-', 4)).toBe(6);
  });

  test('multiplies numbers using the image example 45 * 2', () => {
    expect(calculate(45, '*', 2)).toBe(90);
  });

  test('divides numbers using the image example 20 / 5', () => {
    expect(calculate(20, '/', 5)).toBe(4);
  });

  test('calculates modulo using the extended image example 5 % 2', () => {
    expect(calculate(5, '%', 2)).toBe(1);
    expect(modulo(5, 2)).toBe(1);
  });

  test('calculates powers using the extended image example 2 ^ 3', () => {
    expect(calculate(2, '^', 3)).toBe(8);
    expect(power(2, 3)).toBe(8);
  });

  test('calculates square roots using the extended image example √16', () => {
    expect(calculate(16, '√')).toBe(4);
    expect(squareRoot(16)).toBe(4);
  });
});

describe('calculator operation aliases', () => {
  test('supports addition aliases', () => {
    expect(calculate(2, 'add', 3)).toBe(5);
    expect(calculate(2, 'addition', 3)).toBe(5);
  });

  test('supports subtraction aliases', () => {
    expect(calculate(10, 'subtract', 4)).toBe(6);
    expect(calculate(10, 'subtraction', 4)).toBe(6);
  });

  test('supports multiplication aliases', () => {
    expect(calculate(45, 'x', 2)).toBe(90);
    expect(calculate(45, '×', 2)).toBe(90);
    expect(calculate(45, 'multiply', 2)).toBe(90);
    expect(calculate(45, 'multiplication', 2)).toBe(90);
  });

  test('supports division aliases', () => {
    expect(calculate(20, '÷', 5)).toBe(4);
    expect(calculate(20, 'divide', 5)).toBe(4);
    expect(calculate(20, 'division', 5)).toBe(4);
  });

  test('supports modulo aliases', () => {
    expect(calculate(5, 'mod', 2)).toBe(1);
    expect(calculate(5, 'modulo', 2)).toBe(1);
  });

  test('supports exponentiation aliases', () => {
    expect(calculate(2, '**', 3)).toBe(8);
    expect(calculate(2, 'power', 3)).toBe(8);
    expect(calculate(2, 'exponentiation', 3)).toBe(8);
  });

  test('supports square root aliases', () => {
    expect(calculate(16, 'sqrt')).toBe(4);
    expect(calculate(16, 'squareroot')).toBe(4);
  });
});

describe('calculator edge cases', () => {
  test('handles negative numbers', () => {
    expect(calculate(-2, '+', -3)).toBe(-5);
    expect(calculate(-10, '-', 4)).toBe(-14);
    expect(calculate(-5, '*', 6)).toBe(-30);
    expect(calculate(-20, '/', 5)).toBe(-4);
    expect(calculate(-5, '%', 2)).toBe(-1);
    expect(calculate(-2, '^', 3)).toBe(-8);
  });

  test('handles decimal numbers', () => {
    expect(calculate(1.5, '+', 2.25)).toBeCloseTo(3.75);
    expect(calculate(5.5, '-', 2.25)).toBeCloseTo(3.25);
    expect(calculate(2.5, '*', 4)).toBeCloseTo(10);
    expect(calculate(7.5, '/', 2.5)).toBeCloseTo(3);
    expect(calculate(5.5, '%', 2)).toBeCloseTo(1.5);
    expect(calculate(4, '^', 0.5)).toBeCloseTo(2);
    expect(calculate(6.25, 'sqrt')).toBeCloseTo(2.5);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => calculate(20, '/', 0)).toThrow('Cannot divide by zero.');
    expect(() => calculate(20, 'divide', 0)).toThrow('Cannot divide by zero.');
    expect(() => calculate(20, '÷', 0)).toThrow('Cannot divide by zero.');
  });

  test('throws an error when calculating modulo by zero', () => {
    expect(() => calculate(20, '%', 0)).toThrow('Cannot calculate modulo by zero.');
    expect(() => modulo(20, 0)).toThrow('Cannot calculate modulo by zero.');
  });

  test('throws an error when calculating square root of a negative number', () => {
    expect(() => calculate(-16, '√')).toThrow('Cannot calculate square root of a negative number.');
    expect(() => squareRoot(-16)).toThrow('Cannot calculate square root of a negative number.');
  });

  test('throws an error for unsupported operations', () => {
    expect(() => calculate(2, 'unknown', 3)).toThrow('Unsupported operation: unknown');
  });
});
