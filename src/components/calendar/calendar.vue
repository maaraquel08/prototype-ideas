<template>
  <CalendarGrid
    :model-value="props.modelValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
    :disabled="disabled"
    :min-date="minDate"
    :max-date="maxDate"
    @date-selected="(date) => emit('dateSelected', date)"
  />
</template>

<script setup lang="ts">
import CalendarGrid from './CalendarGrid.vue'
import { calendarProps, type CalendarEmits } from './calendar'

const props = defineProps(calendarProps)
const emit = defineEmits<CalendarEmits>()
</script>

<style scoped>
/* Calendar height transition using CSS Grid technique - simplified and correct */
.card-body {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.4s ease-out;
}

/* The calendar is the grid item that changes height */
.calendar {
  overflow: hidden;
  min-height: 0; /* Important for grid items */
}

/* Ensure the date grid can change height smoothly */
.calendar .grid.grid-cols-7:last-child {
  min-height: 0;
}

/* Smooth transitions for date cell interactions only */
.h-12 {
  transition: background-color 0.2s ease, color 0.2s ease;
}
</style>
