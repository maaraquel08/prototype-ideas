export interface CalendarDate {
  day: number
  date: Date
  isCurrentMonth: boolean
  isSelected: boolean
  key: string
}

export interface CalendarProps {
  modelValue?: Date | null
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

export interface CalendarEmits {
  (e: 'update:modelValue', value: Date | null): void
  (e: 'dateSelected', value: Date | null): void
}

export const calendarProps = {
  modelValue: {
    type: Date as PropType<Date | null>,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  minDate: {
    type: Date as PropType<Date>,
    default: undefined
  },
  maxDate: {
    type: Date as PropType<Date>,
    default: undefined
  }
}

import type { PropType } from 'vue'
