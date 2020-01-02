/* Your Code Here */

function createEmployeeRecord(array) {
	let record = {
					firstName: array[0],
					familyName: array[1],
					title: array[2],
					payPerHour: array[3],
					timeInEvents: [],
					timeOutEvents: []
				}

	return record
}

function createEmployeeRecords(arrayOfArrays) {
	let records  = []

	arrayOfArrays.forEach(array => {
		records.push(createEmployeeRecord(array))
	})
	
	return records
}

let createTimeInEvent = function(stamp) {

	let splitStamp = stamp.split(' ')

	this.timeInEvents.push({
		type: 'TimeIn',
		hour: parseInt(splitStamp[1]),
		date: splitStamp[0]
	})

	return this
}

let createTimeOutEvent = function(stamp) {

	let splitStamp = stamp.split(' ')

	this.timeOutEvents.push({
		type: 'TimeOut',
		hour: parseInt(splitStamp[1]),
		date: splitStamp[0]
	})


	return this
}

let hoursWorkedOnDate = function(date) {
	let timeIn = this.timeInEvents

	let timeOut = this.timeOutEvents

	const timeInObj = timeIn.find(obj => obj.date === date)
	//return the object

	const timeOutObj = timeOut.find(obj => obj.date === date)

	let hoursWorked = (timeOutObj.hour - timeInObj.hour)/100

	return hoursWorked
}

let wagesEarnedOnDate = function(date) {
	const payRate = this.payPerHour

	const hours = hoursWorkedOnDate.call(this, date)

	return hours*payRate
}

function findEmployeeByFirstName(srcArray, firstName) {
	let findRecord = srcArray.find(record => record.firstName === firstName)

	return findRecord
}


function calculatePayroll(arrayOfRecords) {
	let arrayOfWages = []

	arrayOfRecords.forEach(record => arrayOfWages.push(allWagesFor.apply(record)))

	return arrayOfWages.reduce((accumulator, currentValue) => accumulator + currentValue)

}

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