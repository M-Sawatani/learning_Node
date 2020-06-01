var Car = require('./car.js');

var Lamborgini = class extends Car {
  constructor(name) {
    super(name);
  }

  echo() {
    super.drive();
  }

  drive() {
    console.log(`fire ${this.name}`);
  }
};

module.exports = Lamborgini;