
function combineData(data) {
  let combinedData = []
  data.forEach(function(row) {
    let thisDate = row.date
    let index = combinedData.findIndex(x => +x.date === +thisDate)
    if (index > 0) {
      combinedData[index] = Object.assign(combinedData[index], row)
    } else {
      combinedData.push(row)
    }
  })
  return combinedData
}

function fillZeros(data, keys) {
  data.forEach(function(row) {
    keys.forEach(function(key) {
      if (!row[key]) {
        row[key] = 0
      }
    })
  })
  return data
}

function roundDate(date) {
  if (date && date.setHours) {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }
}

function findValue(data, date, metric) {
  let myVal
  data.forEach(function(row) {
    if (+row.data.date == +date) {
      myVal = row.data[metric]
    }
  })
  return myVal
}

function messageType(data) {
  if (data[0] == '{') {
    return 'json'
  } else {
    return 'text'
  }
}

function messageData(data) {
  if (messageType(data) == 'json') {
    return JSON.stringify(JSON.parse(data), null, 2)
  } else {
    var str = "";
    for (var i = 0; i < data.length; i++) {
      var ch = data[i]
      if (ch >= 32 && ch < 127) {
        str += ch
      } else {
        str += "."
      }
    }
    return data
  }
}

export { combineData, fillZeros, roundDate, findValue, messageType, messageData }
