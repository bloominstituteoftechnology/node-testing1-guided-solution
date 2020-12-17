// Implement each piece _after_ writing the test!
// Implement each piece _after_ writing the test!
// Implement each piece _after_ writing the test!

class Car {
  constructor(make, model) {
    this.make = make
    this.model = model
    this.odometer = 0
  }
  drive(...legs /* distance */) {
    // Old functionality before supporting 'legs':
    /*
    this.odometer += distance
    return distance
    */

    // New funtionality supporting 'legs':
    const total = legs.reduce((acc, leg) => acc + leg)
    this.odometer += total
    return total
  }
  driveAsync(distance) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.odometer += distance
        resolve(distance)
      }, 0)
    })
  }
}

module.exports = Car
