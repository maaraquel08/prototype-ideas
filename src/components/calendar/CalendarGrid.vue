<template>
  <div
    class="calendar border rounded-2xl overflow-hidden spr-border-color-weak spr-background-color"
  >
    <!-- Month Navigation -->
    <div class="flex justify-between items-center border-b spr-border-color-weak p-3">
      <div class="flex gap-3 items-center">
        <spr-button size="large" tone="neutral" variant="secondary" class="pointer-events-none">
          {{ currentMonth }}
        </spr-button>
        <spr-button size="large" tone="neutral" variant="secondary" class="pointer-events-none">
          {{ currentYear }}
        </spr-button>
      </div>
      <div class="flex gap-2">
        <spr-button
          size="large"
          tone="neutral"
          variant="secondary"
          :disabled="disabled"
          @click="previousMonth"
          class="cursor-pointer"
        >
          <Icon icon="ph:caret-left" class="w-4 h-4" />
        </spr-button>
        <spr-button
          size="large"
          tone="neutral"
          variant="secondary"
          :disabled="disabled"
          @click="nextMonth"
          class="cursor-pointer"
        >
          <Icon icon="ph:caret-right" class="w-4 h-4" />
        </spr-button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="overflow-hidden">
      <!-- Weekday Headers -->
      <div class="grid grid-cols-7 bg-white">
        <div
          v-for="(day, index) in weekdays"
          :key="day"
          :class="[
            'py-3 px-2 text-center text-xs font-semibold text-gray-700 border-r border-b border-gray-200 last:border-r-0 spr-subheading-xs',
            {
              'bg-gray-100': index === 0 || index === 6,
              'bg-white': index !== 0 && index !== 6,
            },
          ]"
        >
          {{ day }}
        </div>
      </div>

      <!-- Date Cells -->
      <div class="grid grid-cols-7">
        <div
          v-for="(date, index) in calendarDates"
          :key="date.key"
          :class="[
            'h-12 flex items-center justify-center text-sm font-medium cursor-pointer transition-all duration-200 relative',
            {
              // Border logic - avoid double borders with container
              'border-r border-gray-200': (index + 1) % 7 !== 0, // Right border except last column
              'border-b border-gray-200': index < calendarDates.length - 7, // Bottom border except last row

              // Weekend styling (consolidated)
              'bg-gray-100': (index % 7 === 0 || index % 7 === 6) && !date.isSelected,

              // Other month dates (non-weekend)
              'text-gray-300 bg-gray-50':
                !date.isCurrentMonth && !(index % 7 === 0 || index % 7 === 6),
              'text-gray-300': !date.isCurrentMonth && (index % 7 === 0 || index % 7 === 6),

              // Current month dates (non-weekend)
              'text-gray-900 bg-white hover:bg-blue-50':
                date.isCurrentMonth &&
                !date.isSelected &&
                !(index % 7 === 0 || index % 7 === 6) &&
                !isDateDisabled(date),
              'text-gray-900 hover:bg-gray-200':
                date.isCurrentMonth &&
                !date.isSelected &&
                (index % 7 === 0 || index % 7 === 6) &&
                !isDateDisabled(date),

              // Selected date
              'bg-green-500 text-white font-semibold': date.isSelected,

              // Disabled dates
              'opacity-40 cursor-not-allowed': isDateDisabled(date),
            },
          ]"
          @click="selectDate(date)"
        >
          {{ date.day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { calendarProps, type CalendarEmits } from './calendar'
import { useCalendar } from './use-calendar'

const props = defineProps(calendarProps)
const emit = defineEmits<CalendarEmits>()

const {
  currentMonth,
  currentYear,
  weekdays,
  calendarDates,
  previousMonth,
  nextMonth,
  selectDate,
  isDateDisabled,
} = useCalendar(props, emit)
</script>
