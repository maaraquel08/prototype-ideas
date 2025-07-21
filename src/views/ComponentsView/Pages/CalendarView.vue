<template>
  <div class="flex flex-col items-center justify-start min-h-screen gap-8 p-4">
    <div class="w-full max-w-2xl">
      <h1 class="spr-heading-lg text-center mb-8">Calendar Component</h1>

      <!-- Simple Calendar Display -->
      <div class="w-full spr-background-color rounded-2xl overflow-hidden calendar-card">
        <!-- Header Section -->
        <div class="bg-white border-b border-gray-200 p-4">
          <h3 class="spr-subheading-xs">Select Date</h3>
          <p class="spr-body-sm-regular">Choose a date from the calendar</p>
        </div>

        <!-- Card Body -->
        <div class="card-body p-4">
          <Calendar v-model="selectedDate" @date-selected="handleDateSelected" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Calendar from '@/components/calendar/calendar.vue'

// Reactive data
const selectedDate = ref<Date | null>(null)

// Event handler
const handleDateSelected = (date: Date) => {
  console.log('Calendar date selected:', date)
}
</script>

<style scoped>
/* Calendar Card Styles */
.calendar-card {
  background: white;
}

/* Calendar height transition using CSS Grid technique */
.card-body {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.4s ease-out;
}
</style>
