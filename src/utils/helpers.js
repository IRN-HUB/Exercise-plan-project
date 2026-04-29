export function formatDate(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getToday() {
  return formatDate(new Date())
}

export function getWeekDates() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const monday = new Date(today)
  monday.setDate(today.getDate() + diff)

  const dates = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    dates.push(formatDate(d))
  }
  return dates
}

export function getDateFromDayName(dayName) {
  const dayMap = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }
  const targetDay = dayMap[dayName]
  if (targetDay === undefined) return null

  const today = new Date()
  const currentDay = today.getDay()
  let diff = targetDay - currentDay
  if (diff < 0) diff += 7
  const d = new Date(today)
  d.setDate(today.getDate() + diff)
  return formatDate(d)
}

export function getChineseWeekday(dateStr) {
  const d = new Date(dateStr)
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return days[d.getDay()]
}

export function calculateStreak(logs) {
  const dates = Object.keys(logs)
    .filter(date => logs[date].completed)
    .sort()
    .reverse()

  if (dates.length === 0) return 0

  let streak = 0
  const today = new Date()

  for (let i = 0; i < dates.length; i++) {
    const expected = new Date(today)
    expected.setDate(today.getDate() - i)
    const expectedStr = formatDate(expected)

    if (dates[i] === expectedStr) {
      streak++
    } else {
      break
    }
  }

  return streak
}

export function getWeekNumber(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}
