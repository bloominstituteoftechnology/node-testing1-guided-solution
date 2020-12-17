const Car = require('./car') // Bring this _after_ failing `expect(Car).toBeDefined()`

// END OF CLASS NOTE: we can fast forward timers
// END OF CLASS NOTE: we can mock libraries

// 'describe' blocks organize tests and can be nested
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
// Unit tests test the smallest unit of a program: a class or a function
describe('Car class', () => {
  let prius // Let's leverage closures in the following blocks
  beforeEach(() => {
    // Good place to 'reset the state' we use in multiple tests
    // Tests should never rely on state left by previous tests
    // Every test must be able to pass in isolation
    prius = new Car('toyota', 'prius')
  })
  it('TDD starts with a failing test', () => {
    expect(Car).toBeDefined() // Import at the top to pass this test
  })
  it('makes instances of Cars', () => {
    // const prius = new Car('toyota', 'prius') // Not needed after setting up `beforeEach`
    expect(prius).toBeInstanceOf(Car)
  })
  it('cars have a make property', () => {
    // const prius = new Car('toyota', 'prius') // Not needed after setting up `beforeEach`
    expect(prius.make).toBe('toyota') // Strict equality
    expect(prius).toHaveProperty('make') // Checking only existance of a property
    expect(prius).toHaveProperty('make', 'toyota') // Property _and_ its value
  })
  it('cars have a model property', () => {
    // Let students do this
    expect(prius.model).toBe('prius');
  })
  it('cars have the make and model passed into Car', () => {
    // BRITTLE TEST, will fail as soon as Car evolves to have more props:
    // expect(prius).toEqual(
    //   { make: 'toyota', model: 'prius' }
    // )

    // MUCH BETTER, won't break as Car gets more features and props:
    expect(prius).toMatchObject(
      { make: 'toyota', model: 'prius' }
    )
  })
  it('new cars have odometer set at 0', () => {
    // Let students do this
    expect(prius.odometer).toBe(0)
  })
  it('has a drive method', () => {
    // Let students attempt this
    expect(prius.drive).toBeDefined()
    expect(prius.drive).toBeTruthy()
    expect(prius.drive).toBeInstanceOf(Function)
    // Add an _empty_ drive method (TDD - test first, then minimum code to make test pass)
    // Optional reminder that instances get their methods from their prototype object:
    expect(prius.drive).toBe(Car.prototype.drive) // Strictly the same thing!
  })
  it('drive returns the driven distance', () => {
    // Let students attempt this
    // Multiple assertions a good idea
    // Implement functionality _after_ writing failing test (TDD)
    expect(prius.drive(5)).toBe(5)
    expect(prius.drive(0)).toBe(0)
    expect(prius.drive(10)).toBe(10)
  })
  it('drive increases the odometer by the driven distance', () => {
    // Let students attempt this
    // Tests should avoid testing things that are tested already:
    // expect(prius.drive(5)).toBe(5) // Not necessary here!

    prius.drive(5) // Act!
    expect(prius.odometer).toBe(5)
    // Implement functionality _after_ writing failing test (TDD)
    // We need several assertions to make sure distances 'acumulate' in the odometer
    prius.drive(6)
    expect(prius.odometer).toBe(11)
    prius.drive(9)
    expect(prius.odometer).toBe(20)
  })
  it('drive supports comma-separated legs', () => {
    // Let students attempt this
    // Implement functionality _after_ writing failing test (TDD)
    // Reward yourself for getting tests passing by refactoring
    // Discuss Red-Green-Refactor cycle
    expect(prius.drive(1, 2, 3)).toBe(6)
    expect(prius.drive(4, 5, 6)).toBe(15)
    expect(prius.odometer).toBe(21)
  })
  it('driveAsync increases odometer by driven distance', async () => {
    // Testing async functions usign async/await
    await prius.driveAsync(5) // act
    expect(prius.odometer).toBe(5)
    await prius.driveAsync(5) // act
    expect(prius.odometer).toBe(10)
  }, 50)
  it('driveAsync resolves to the driven distance with async/await', async () => {
    // Let students attempt this
    // Careful to not accidentally put `async` on a `describe` callback
    const drivenDistance = await prius.driveAsync(5)
    expect(drivenDistance).toBe(5)
  }, 50)
  it('driveAsync resolves to the driven distance with then/catch', () => {
    prius.driveAsync(5)
      .then(drivenDistance => {
        expect(drivenDistance).toBe(5)
      })
  }, 50) // Prudent not to allow jest the default 5 seconds before it times out
})
