const moment = require('moment')

module.exports = {
  dateFormate(data, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(data).format(format)
  },
}
