'use strict';

const { calculate } = require('../calculator');

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
});

describe('calculator edge cases', () => {
  test('handles negative numbers', () => {
    expect(calculate(-2, '+', -3)).toBe(-5);
    expect(calculate(-10, '-', 4)).toBe(-14);
    expect(calculate(-5, '*', 6)).toBe(-30);
    expect(calculate(-20, '/', 5)).toBe(-4);
  });

  test('handles decimal numbers', () => {
    expect(calculate(1.5, '+', 2.25)).toBeCloseTo(3.75);
    expect(calculate(5.5, '-', 2.25)).toBeCloseTo(3.25);
    expect(calculate(2.5, '*', 4)).toBeCloseTo(10);
    expect(calculate(7.5, '/', 2.5)).toBeCloseTo(3);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => calculate(20, '/', 0)).toThrow('Cannot divide by zero.');
    expect(() => calculate(20, 'divide', 0)).toThrow('Cannot divide by zero.');
    expect(() => calculate(20, '÷', 0)).toThrow('Cannot divide by zero.');
  });

  test('throws an error for unsupported operations', () => {
    expect(() => calculate(2, '%', 3)).toThrow('Unsupported operation: %');
  });
});
