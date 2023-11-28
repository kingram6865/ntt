const { Console } = require("console")
const fs = require('fs')
const path = require('path')

function fileDate(datetime) {
  let year, month, day, hours, minutes, seconds
  year = datetime.getFullYear()
  month = datetime.getMonth() + 1
  day = datetime.getDate()

  hours = datetime.getHours()
  minutes = datetime.getMinutes()
  seconds = datetime.getSeconds()

  return `${year}-${month}-${day}_${hours}${minutes}`
}

function timeStamp() {
  let timestamp, year, month, day, hours, minutes, seconds, tz
  const thisMoment = new Date()
  year = thisMoment.getFullYear()
  month = thisMoment.getMonth() + 1
  day = thisMoment.getDate()

  hours = thisMoment.getHours()
  minutes = thisMoment.getMinutes()
  seconds = thisMoment.getSeconds()
  tz = thisMoment.getTimezoneOffset()/60

  timestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} +000${tz}`
  return timestamp
}

function appLogger(dir) {
  if (!fs.existsSync(`${dir}/logs`)){
    fs.mkdirSync(`${dir}/logs`);
  }

  const log = new Console({
    stdout: fs.createWriteStream(path.join(dir, `/logs/app.log`), { flags: 'a' }),
    stderr: fs.createWriteStream(path.join(dir, `/logs/errors.log`), { flags: 'a' }),
  })
  
  return log
}

module.exports = {
  fileDate, 
  timeStamp, 
  appLogger
}