const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(id, name, email, github) {
    // call parent constructor
    super(id, name, email);

    this.github = github;
  }
    //github // GitHub username
    getGithub() {

    return this.github;
  }

  // Overridden to return 'Engineer'
  getRole() {
    return 'Engineer';
  }
}

// inherit prototype methods from Character
Engineer.prototype = Object.create(Employee.prototype);

module.exports = Engineer;




