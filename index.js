function createEmployeeRecord(employeeInfo) {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  function allWagesFor() {
    const dates = this.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((total, date) => {
      return total + wagesEarnedOnDate.call(this, date);
    }, 0);
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor.call(employee);
    }, 0);
  }
  
  function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
    findEmployeeByFirstName
  };
  