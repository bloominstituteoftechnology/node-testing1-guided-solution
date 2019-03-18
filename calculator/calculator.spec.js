const { add } = require('./calculator.js');

describe('calculator.js', () => {
  it('runs the tests', () => {
    expect(true).toBe(true);
  });

  // note that we can nest describes
  describe('add()', () => {
    it('should return the sum of two numbers', () => {
      expect(add(2, 2)).toBe(4); // could be a false positive
      expect(add(2, 3)).toBe(5); // helps reveal the bug
    });

    // it.todo('should return 0 when called with no arguments');

    // it('should return 0 when called with no arguments', () => {
    //   // arrange
    //   const expected = 0;

    //   // act
    //   const actual = add();

    //   // assert
    //   expect(actual).toBe(expected);
    // });

    it('should return 0 when called with no arguments', () => {
      expect(add()).toBe(0);
    });

    it('should return the passed in value when only one argument provided', () => {
      expect(add(2)).toBe(2);
      expect(add(-1)).toBe(-1);
    });

    it('should handle any number of arguments', () => {
      expect(add(1, 2, 3)).toBe(6);
      expect(add(1, 2, 3, 5)).toBe(11);
    });

    it('should handle an array of numbers', () => {
      expect(add([1, 2, 3])).toBe(6);
      expect(add([1, 2, 3, 5])).toBe(11);
    });
  });
});

//
