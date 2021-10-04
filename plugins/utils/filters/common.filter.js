import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import moment from 'moment'

Vue.use(Vue2Filters)

Vue.filter('datetimeToDate', (value) => {
  if (!value) {
    return ''
  }
  return moment(value).format('DD MMM YYYY')
})

Vue.filter('datetimeToDatetime', (value) => {
  if (!value) {
    return ''
  }
  return moment(value).format('DD MMM YYYY HH:mm')
})

Vue.filter('textElipsis', (value) => {
  if (!value) {
    return ''
  }
  return value.slice(0, 200) + '...'
})
