var moment = require('moment')
var _ = require('lodash')

export default {
  getDaysOfWeek({year, month, date}) {
    let data = this.getDays({year, month, date})
    return data
  },
  getDaysOfMonth({year, month, date, current}) {
    let data = this.getDays({year, month, date, range: 'month'})
    data.days = _.groupBy(data.days, d => d.week)
    return data
  },
  getDaysOfYear({year, month, date, current}) {
    let data = this.getDays({year, month, date, range: 'year'})
    data.days = _.groupBy(data, d => d.month)
    return data
  },
  getDays({year, month, date, range = 'week'}) {
    let current = moment({y: year, M: month, d: date})
    let beginOfDate = moment(current).startOf(range)
    let endOfDate = moment(current).endOf(range)

    let beginOfWeek = moment(beginOfDate).startOf('week')
    let endOfWeek = moment(endOfDate).endOf('week')

    let days = []
    while (!beginOfWeek.isAfter(endOfWeek)) {
      days.push({
        year: beginOfWeek.year(),
        month: beginOfWeek.month(),
        date: beginOfWeek.date(),
        day: beginOfWeek.days(),
        dayOfYear: beginOfWeek.dayOfYear(),
        week: beginOfWeek.week(),
        isToday: beginOfWeek.dayOfYear() === moment().dayOfYear(),
        isCurrent: beginOfWeek.isSame(current, 'day'),
        disable: beginOfWeek.isBefore(beginOfWeek) || beginOfWeek.isAfter(endOfDate)
      })
      beginOfWeek.add(1, 'day')
    }
    return {
      days,
      year: current.year(),
      month: current.month(),
      date: current.date()
    }
  }
}
