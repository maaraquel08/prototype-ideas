import { ref, computed, watch } from 'vue'
import type { CalendarDate, CalendarProps, CalendarEmits } from './calendar'

export function useCalendar(props: CalendarProps, emit: CalendarEmits) {
  // Reactive state
  const currentDate = ref(new Date())
  const selectedDate = ref<Date | null>(props.modelValue ?? null)

  // Constants
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // Watch for external changes to modelValue
  watch(
    () => props.modelValue,
    (newValue) => {
      selectedDate.value = newValue ?? null
      if (newValue) {
        currentDate.value = new Date(newValue)
      }
    },
  )

  // Computed properties
  const currentMonthYear = computed(() => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' }
    return currentDate.value.toLocaleDateString('en-US', options)
  })

  const currentMonth = computed(() => {
    const options: Intl.DateTimeFormatOptions = { month: 'long' }
    return currentDate.value.toLocaleDateString('en-US', options)
  })

  const currentYear = computed(() => {
    return currentDate.value.getFullYear().toString()
  })

  const calendarDates = computed((): CalendarDate[] => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()

    // Get first day of the month and how many days in the month
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    // Get previous month's last days
    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()

    const dates: CalendarDate[] = []

    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      dates.push({
        day,
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isSelected: false,
        key: `prev-${day}`,
      })
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelected =
        selectedDate.value && date.toDateString() === selectedDate.value.toDateString()

      dates.push({
        day,
        date,
        isCurrentMonth: true,
        isSelected,
        key: `current-${day}`,
      })
    }

    // Only add next month days if we need to complete the current week
    // This allows for variable height calendars (4-6 weeks instead of always 6)
    const currentWeekDay = dates.length % 7
    if (currentWeekDay !== 0) {
      const remainingDaysInWeek = 7 - currentWeekDay
      for (let day = 1; day <= remainingDaysInWeek; day++) {
        dates.push({
          day,
          date: new Date(year, month + 1, day),
          isCurrentMonth: false,
          isSelected: false,
          key: `next-${day}`,
        })
      }
    }

    return dates
  })

  // Methods
  const previousMonth = () => {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() - 1)
    currentDate.value = newDate
  }

  const nextMonth = () => {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() + 1)
    currentDate.value = newDate
  }

  const selectDate = (dateObj: CalendarDate) => {
    if (!dateObj.isCurrentMonth || (props.disabled ?? false)) return

    // Check date constraints
    if (props.minDate && dateObj.date < props.minDate) return
    if (props.maxDate && dateObj.date > props.maxDate) return

    selectedDate.value = dateObj.date
    emit('update:modelValue', dateObj.date)
    emit('dateSelected', dateObj.date)
  }

  const isDateDisabled = (date: CalendarDate): boolean => {
    if (props.disabled ?? false) return true

    if (props.minDate && date.date < props.minDate) return true
    if (props.maxDate && date.date > props.maxDate) return true

    return false
  }

  return {
    // State
    currentDate,
    selectedDate,
    weekdays,

    // Computed
    currentMonthYear,
    currentMonth,
    currentYear,
    calendarDates,

    // Methods
    previousMonth,
    nextMonth,
    selectDate,
    isDateDisabled,
  }
}
