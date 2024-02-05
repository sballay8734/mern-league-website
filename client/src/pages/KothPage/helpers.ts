export function getCurrentYear() {
  let currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  if (currentMonth === 0 || currentMonth === 1) {
    currentYear -= 1
  }

  return currentYear.toString()
}
