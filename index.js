/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = function(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: new Array(),
        timeOutEvents: new Array()
    }
}

const createEmployeeRecords = function(records) {
    return records.map(function(record) { return createEmployeeRecord(record) })
}

const createTimeInEvent = function(dateStamp) {
    this.timeInEvents.push(newTimeEvent.call(dateStamp, 'TimeIn'))
    return this
}

const newTimeEvent = function(eventType) {
    return {
        type: eventType,
        hour: parseInt(this.split(' ')[1]),
        date: this.split(' ')[0]
    }
}

const createTimeOutEvent = function(dateStamp) {
    this.timeOutEvents.push(newTimeEvent.call(dateStamp, 'TimeOut'))
    return this
}

const getDate = function(queryDate) {
    return this.find(function(event) {return event.date === queryDate})
}

const hoursWorkedOnDate = function(queryDate) {
    return getDate.call(this.timeOutEvents, queryDate).hour / 100 - getDate.call(this.timeInEvents, queryDate).hour / 100
}

const wagesEarnedOnDate = function(queryDate) {
    return hoursWorkedOnDate.call(this, queryDate) * this.payPerHour
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employee) { return employee.firstName === firstName})
}

const calculatePayroll = function(records) {
    return records.reduce(function(accumulator, record) {
        return accumulator + record.timeInEvents.reduce(function(accumulator, timeInEvent) {
            return accumulator + wagesEarnedOnDate.call(record, timeInEvent.date)
        }, 0)
    }, 0)
}