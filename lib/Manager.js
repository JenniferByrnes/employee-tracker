const Employee = require('./Employee');

class Manager extends Employee {
  constructor(id, name, email, officeNumber) {
    // call parent constructor
    super(id, name, email);

    this.officeNumber = officeNumber;
  }
  // office number
  getOfficeNumber() {

    return this.officeNumber;
  }

  // Overridden to return 'Manager'
  getRole() {
    return 'Manager';
  }
}

// inherit prototype methods from Character
Manager.prototype = Object.create(Employee.prototype);

module.exports = Manager;