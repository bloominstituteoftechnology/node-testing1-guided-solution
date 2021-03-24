# Unit Testing Guided Project

In this module we will cover the basics of automated testing and use `jest` to write unit tests.

## Introduce Project

Introduce the [guided project](https://github.com/LambdaSchool/node-testing1-guided) and make sure all students have it cloned, **not forked**.

The instructor works on a "lecture" branch and pushes commits regularly (use of a script for this is recommended).

Students can reset their code to the instructor's latest push by using the "ketchup" script provided in the `package.json`.

## Introduce Testing

Open Canvas and go through the content, emphasis on:

- What is automated testing.
- Why should we use automated testing.
- What `refactoring` and `regressions` are.
- Type of automated tests.

## Add Jest

- Introduce `jest`, show the [docs](https://jestjs.io/docs/en/getting-started.html)
- Add `jest` and `@types/jest` as dev dependencies.
- Add config file: `npx jest --init`, the defaults are fine.
- Fix test script: `jest --watchAll --verbose`, explain flags.
- Run `npm test` to start the test runner.
- Explain that `jest` uses `git` to know if the JavaScript files have changed in order to run the tests.
- How does `jest` find tests to run?
  - add `__tests__` folder with an `index.js` file inside. Note that `jest` looks for tests inside it.
  - note the message explaining that a `suite` (a file) must have test or it will fail the test run.
  - add an `index.test.js` to root. Explain why `jest` tries to run tests from this file.
  - add an `index.spec.js` to root. Explain why `jest` tries to run tests from this file.

Optionally add `eslint` to the project using `npx eslint --init` and show how to configure it with `jest` (see `.eslintrc.json`).

We will write tests only inside `./car/car.spec.js`, so go ahead and remove the `__tests__` folder, `index.test.js` and `index.spec.js` as they are not needed and will only cause noise in the terminal. **Make sure students know that you manually removed them.**

## Add First Tests

- Inside `./car/car.spec.js`:

  ```js
  describe('Intro to unit testing', () => {
    // This test is useful to confirm the tooling is working
    // Explain jest globals, it and test (show the docs for globals)
    it('works', () => { // THIS is a test
      expect(2 + 2).toBe(4) // Assertion (comparing actual vs. expected)
    })
    test('toBe vs. toEqual', () => { // THIS is another test (empty tests are false positives)
      expect({}).not.toBe({}) // Use `toEqual` when comparing composite shapes
      expect({}).toEqual({}) // One test can have multiple **related** assertions
    })
  })
  ```

- Time to start implementing the Car class, but we'll build it using the `TDD workflow`.

  ```js
  describe('Car class', () => {})
  ```

## Introduce TDD and the red-green-refactor cycle

- Find an [image that depicts the TDD workflow](https://centricconsulting.com/wp-content/uploads/2018/07/TDD1.jpg), and show it as you explain how TDD works.

## Test the Car

- Add the first test for the Car class. It should break:

  ```js
    it('TDD starts with a failing test', () => {
      expect(Car).toBeDefined()
    })
  ```

- Pass the test exporting an empty object from car.js:

  ```js
  // car.spec.js
  const Car = require('./car')
  // car.js
  module.exports = {}
  ```

- Add a second test. It should fail:

  ```js
  it('makes instances of Cars', () => {
    const prius = new Car('toyota', 'prius')
    expect(prius).toBeInstanceOf(Car)
  })
  ```

- Make the test pass:

  ```js
  // car.js
  class Car {}
  module.exports = Car
  ```

## Introduce test.todo

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
    const actual = new Car('toyota', 'prius').make
    // assert
    expect(actual).toBe(expected)
  })
  ```

- Make the test pass:

  ```js
  class Car {
    constructor(make) { this.make = make }
  }
  ```

## Use beforeEach to avoid repetitive setup inside tests

- Explain that each test must have clean state (a fresh car).
- Tests should never rely on state left by previous tests.
- Every test must be able to pass in isolation.

  ```js
  describe('Car class', () => {
    let prius
    beforeEach(() => {
      prius = new Car('toyota', 'prius')
    })
    // tests
  }
  ```

## Explore different kinds of matchers

- Show some of the matchers provided by `jest` in the [docs](https://jestjs.io/docs/en/expect).
- Show VSCode's intellisense for matchers provided by `@types/jest` library.
- Allow students to do as much of the work as possible.
- Use TDD and demo the red-green-refactor cycle.

  ```js
  // car.spec.js
  it('cars have a make property', () => {
    expect(prius.make).toBe('toyota') // Strict equality
    expect(prius).toHaveProperty('make') // Checking only existance of a property
    expect(prius).toHaveProperty('make', 'toyota') // Property _and_ its value
  })
  it('cars have a model property', () => {
    expect(prius.model).toBe('prius');
  })
  it('cars have the make and model passed into Car', () => {
    // BRITTLE TEST, will fail as soon as Car evolves to have more props:
    expect(prius).toEqual(
      { make: 'toyota', model: 'prius' }
    )
    // MUCH BETTER, won't break as Car gets more features and props:
    expect(prius).toMatchObject(
      { make: 'toyota', model: 'prius' }
    )
  })
  it('new cars have odometer set at 0', () => {
    expect(prius.odometer).toBe(0)
  })

  // car.js
  class Car {
    constructor(make, model) {
      this.make = make
      this.model = model
      this.odometer = 0
    }
  }
  ```

## Testing functions

- Testing that a method exists:

  ```js
  // test.spec.js
  it('has a drive method', () => {
    // Let students try to come up with ideas to test this
    expect(prius.drive).toBeDefined()
    expect(prius.drive).toBeTruthy()
    expect(prius.drive).toBeInstanceOf(Function)
    expect(prius.drive).toBe(Car.prototype.drive) // Strictly the same thing!
  })
  // car.js
  class Car {
    constructor(make, model) { /* etc */ }
    drive() {}
  }
  ```

- Testing the return value of a function:

  ```js
  // test.spec.js
  it('drive returns the driven distance', () => {
    // Let students attempt this
    // Multiple assertions a good idea
    expect(prius.drive(5)).toBe(5)
    expect(prius.drive(0)).toBe(0)
    expect(prius.drive(10)).toBe(10)
  })
  // car.js
  class Car {
    constructor(make, model) { /* etc */ }
    // Let students attempt this
    drive(distance) { return distance }
  }
  ```

- Testing the side effects of a function:

  ```js
  // test.spec.js
  it('drive increases the odometer by the driven distance', () => {
    // Let students attempt this
    // Tests should avoid testing things that are tested elsewhere:
    // expect(prius.drive(5)).toBe(5) // Not necessary here!
    prius.drive(5)
    expect(prius.odometer).toBe(5)
    prius.drive(6)
    expect(prius.odometer).toBe(11)
    prius.drive(9)
    expect(prius.odometer).toBe(20)
  })
  // car.js
  class Car {
    constructor(make, model) { /* etc */ }
    // Let students attempt this
    drive(distance) { this.odometer += distance; return distance }
  }
  ```

- Now it should be obvious why we need a fresh car for each test.
- We don't want miles in the odometer for the next test.
- Adding new features to a function while keeping existing functionality:

  ```js
  // test.spec.js
  it('drive supports comma-separated legs', () => {
    // Let students attempt this
    // Implement functionality _after_ writing failing test (TDD)
    // Reward yourself for getting tests passing by refactoring
    expect(prius.drive(1, 2, 3)).toBe(6)
    expect(prius.drive(4, 5, 6)).toBe(15)
    expect(prius.odometer).toBe(21)
  })
  // car.js
  class Car {
    constructor(make, model) { /* etc */ }
    // Let students attempt this
    drive(...legs) {
      const total = legs.reduce((acc, leg) => acc + leg)
      this.odometer += total
      return total
    }
  }
  ```

## Testing async functions (if time allows)

- See car.spec.js
- Demo async/await and then/catch
