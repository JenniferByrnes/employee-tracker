const Employee = require('./Employee');

class Intern extends Employee {
  constructor(id, name, email, school) {
    // call parent constructor
    super(id, name, email);

    this.school = school;
  }
    //school // School name
    getSchool() {

    return this.school;
  }

  // Overridden to return 'Intern'
  getRole() {
    return 'Intern';
  }
}

// inherit prototype methods from Character
Intern.prototype = Object.create(Employee.prototype);

module.exports = Intern;