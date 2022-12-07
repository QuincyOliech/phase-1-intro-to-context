// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    return array.map(employee => createEmployeeRecord(employee))
}
function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}
function wagesEarnedOnDate(employee, date){
    let hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}
function allWagesFor(employee){
    let dates = employee.timeInEvents.map(event => event.date)
    let wages = dates.map(date => wagesEarnedOnDate(employee, date))
    return wages.reduce((total, wage) => total + wage)
}
function findEmployeeByFirstName(arraySource, firstName){
    return arraySource.find(employee => employee.firstName === firstName)
}
function calculatePayroll(array){
    return array.reduce((total, employee) => total + allWagesFor(employee), 0)
}
