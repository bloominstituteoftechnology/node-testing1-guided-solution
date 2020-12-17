# Unit Testing Guided Project

In this module we will cover the basics of automated testing and use `jest` to write unit tests.

## Introduce Project

Introduce the [guided project](https://github.com/LambdaSchool/webtesting-i-guided) and make sure all students have it cloned, **not forked**.

The instructor works on a "lecture" branch and pushes commits regularly (use of a script for this is recommended).

Students can reset their code to the instructor's latest push by using the "ketchup" script provided in the `package.json`.

## Introduce Testing

Open Canvas and go through the content, emphasis on:

- what is automated testing.
- why should we use automated testing.
- what `refactoring` and `regressions` are.
- type of automated tests.

## Add Jest

- introduce `jest`, show the [docs](https://jestjs.io/docs/en/getting-started.html)
- add `jest` as a dev dependency.
- add test script: `jest --watchAll --verbose`, explain flags.
- add config file: `npx jest --init`, the defaults are fine.
- type `npm test` to start the test runner. Explain that `jest` uses `git` to know if the JavaScript files have changed in order to run the tests.
- how does `jest` find tests to run?
  - add `__tests__` folder with an `index.js` file inside. Note that `jest` looks for tests inside it.
  - note the message explaining that a `suite` (a file) must have test or it will fail the test run.
  - add an `index.test.js` to root. Explain why `jest` tries to run tests from this file.
  - add an `index.spec.js` to root. Explain why `jest` tries to run tests from this file.

Optionally add `eslint` to the project using `npx eslint --init` and show how to configure it with `jest` (see `.eslintrc.json`).

We will write tests only inside `./car/car.spec.js`, so go ahead and remove the `__tests__` folder, `index.test.js` and `index.spec.js` as they are not needed and will only cause noise in the terminal. **Make sure students know that you manually removed them.**

**wait for students to catch up**

We haven't written any tests yet, we'll do that next.

## Add First Test

- inside `./car/car.spec.js`:

  ```js
  describe('Intro to unit testing', () => {
    // This test is useful to confirm the tooling is working
    // Explain jest globals, it and test (show the docs for globals)
    it('works', () => { // THIS is the test
      expect(2 + 2).toBe(4) // Assertion (comparing actual vs. expected)
    })
    test('toBe vs. toEqual', () => { // THIS is another test (empty tests are false positives)
      expect({}).not.toBe({}) // Use `toEqual` when comparing composite shapes
      expect({}).toEqual({}) // One test can have multiple **related** assertions
    })
  })
  ```

**wait for students to catch up**

- Time to start implementing the Car class, but we'll build it using the `TDD workflow`.

  ```js
  describe('Car class', () => {})
  ```

## Introduce TDD

- find an [image that depicts the TDD workflow](https://centricconsulting.com/wp-content/uploads/2018/07/TDD1.jpg), and show it as you explain how TDD works.

## Test the Car

- add the first test for the Car class. It should break.

  ```js
    it('TDD starts with a failing test', () => {
      expect(Car).toBeDefined()
    })
  ```

- pass the test exporting an empty object from car.js.

  ```js
  // car.js
  module.exports = {}

  // car.spec.js
  const Car = require('./car') 
  ```

- add another assertion. It should fail.

  ```js
  it('makes instances of Cars', () => {
    const prius = new Car()
    expect(prius).toBeInstanceOf(Car)
  })
  ```

- make the test pass.

  ```js
  class Car {}
  module.exports = Car
  ```

**wait for students to catch up**

## Introduce test.todo() and it.todo()

- As we write one test, ideas for other tests come to mind we can write placeholders for those tests.

  ```js
  // remember to leave out the function
  it.todo('cars have a make property'); // show the terminal output for todo tests
  ```

## Introduce AAA

- Explain how thinking about our test in the context of `Arrange > Act > Assert` can help when writing tests. An example:

  ```js
  it('cars have a make property', () => {
    // arrange
    const expected = 'toyota'
    // act
    const actual = Car('toyota').make
    // assert
    expect(actual).toBe(expected)
  })
  ```

- make the test pass.

  ```js
  class Car {
    constructor(make) {
      this.make = make
    }
  }
  ```

**wait for students to catch up**

## You Do (estimated 5 mins to complete)

Write a test for: _should return the value passed when only one argument is provided_.

One possible solution:

```js
it('should return the passed in value when only one argument provided', () => {
  expect(add(2)).toBe(1); // we do this to make sure the test can fail
  expect(add(-1)).toBe(-1);
});
```

Fix the test to make it pass: `expect(add(2)).toBe(2);`

**wait for students to catch up**

**take a break if needed**

New feature: _add support for any number of arguments_.

```js
it('should handle any number of arguments separated by comma', () => {
  expect(add(1, 2, 3)).toBe(6);
  expect(add(1, 2, 3, 5)).toBe(11);
});

// calculator.js
function add(args) {
  return Array.from(arguments).reduce((sum, value) => {
    return sum + value;
  }, 0);
}
```

**wait for students to catch up**

New feature: _add support for accepting an array of numbers_.

```js
it('should handle an array of numbers', () => {
  expect(add([1, 2, 3])).toBe(6);
  expect(add([1, 2, 3, 5])).toBe(11);
});

// calculator.js
function add(args) {
  const values = Array.isArray(args) ? args : Array.from(arguments);

  return values.reduce((sum, value) => {
    return sum + value;
  }, 0);
}
```

Explain how this is similar to most agile environments. New features are requested and we need to implement them without breaking existing functionality. Having a test suite provides **confidence**.

**wait for students to catch up**

Open the [jest documentation for expect](https://jestjs.io/docs/en/expect) and show some of the matchers provided by `jest`.
