<template>
  <!-- Main Content -->
  <div
    class="overtime-request-container spr-background-color-surface flex flex-col items-center justify-start h-[100vh]"
  >
    <!-- Calendar Card Structure -->
    <div
      class="w-full h-fit spr-background-color rounded-2xl overflow-hidden calendar-card max-w-lg border spr-border-color-weak"
    >
      <!-- Header Section -->
      <div class="bg-white border-b border-gray-200 p-4">
        <h3 class="spr-subheading-xs">Overtime Dates</h3>
        <p class="spr-body-sm-regular">Select the date you want to apply for an overtime</p>
      </div>

      <!-- Card Body -->
      <div class="card-body spr-background-color">
        <div class="p-4 overflow-hidden">
          <Calendar v-model="selectedOvertimeDate" @date-selected="handleDateSelected" />
        </div>
      </div>
    </div>

    <!-- Shift Card Lists -->

    <ShiftSelection
      v-model="selectedShiftId"
      :shifts="availableShifts"
      :is-expanded="!!selectedOvertimeDate"
      :is-loading="isLoadingShifts"
      class="rounded-2xl overflow-hidden w-full h-fit calendar-card max-w-lg p-4"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Calendar from '@/components/calendar/calendar.vue'
import ShiftSelection from './components/ShiftSelection.vue'
import ShiftPreview from './components/ShiftPreview.vue'
import DetailsForm from './components/DetailsForm.vue'
import AttachmentsSection from './components/AttachmentsSection.vue'

// Component state
const selectedOvertimeDate = ref<Date | null>(null)
const otClassification = ref('regular')
const timeFrom = ref('')
const timeTo = ref('')
const otMinutes = ref('')
const reason = ref('')
const selectedShiftId = ref<string>('')
const availableShifts = ref<any[]>([])
const isLoadingShifts = ref(false)

// Default shift available for all dates
const defaultShift = {
  id: 'default-shift',
  timeRange: '09:00AM - 06:00PM',
  branch: 'Branch Name',
  shiftType: 'Standard Day Shift',
  defaultBg: 'bg-green-50',
  defaultBorder: 'border-green-200',
  selectedBg: 'bg-green-100',
  selectedBorder: 'border-green-500',
}

// Dummy data mapping dates to shifts
const shiftsByDate: { [key: string]: any[] } = {
  '2025-07-25': [
    {
      id: 'shift1',
      timeRange: '06:00AM - 02:00PM',
      branch: 'Branch Name',
      shiftType: 'Early Morning',
      defaultBg: 'bg-blue-50',
      defaultBorder: 'border-blue-200',
      selectedBg: 'bg-blue-100',
      selectedBorder: 'border-blue-500',
    },
    {
      id: 'shift2',
      timeRange: '09:00AM - 06:00PM',
      branch: 'Branch Name',
      shiftType: 'Standard Day Shift',
      defaultBg: 'bg-green-50',
      defaultBorder: 'border-green-200',
      selectedBg: 'bg-green-100',
      selectedBorder: 'border-green-500',
    },
  ],
  '2025-07-26': [
    {
      id: 'shift3',
      timeRange: '11:00AM - 07:00PM',
      branch: 'Branch Name',
      shiftType: 'Late Morning',
      defaultBg: 'bg-orange-50',
      defaultBorder: 'border-orange-200',
      selectedBg: 'bg-orange-100',
      selectedBorder: 'border-orange-500',
    },
  ],
  '2025-07-28': [
    {
      id: 'shift1',
      timeRange: '06:00AM - 02:00PM',
      branch: 'Branch Name',
      shiftType: 'Early Morning',
      defaultBg: 'bg-blue-50',
      defaultBorder: 'border-blue-200',
      selectedBg: 'bg-blue-100',
      selectedBorder: 'border-blue-500',
    },
    {
      id: 'shift2',
      timeRange: '09:00AM - 06:00PM',
      branch: 'Branch Name',
      shiftType: 'Standard Day Shift',
      defaultBg: 'bg-green-50',
      defaultBorder: 'border-green-200',
      selectedBg: 'bg-green-100',
      selectedBorder: 'border-green-500',
    },
    {
      id: 'shift3',
      timeRange: '11:00AM - 07:00PM',
      branch: 'Branch Name',
      shiftType: 'Late Morning',
      defaultBg: 'bg-orange-50',
      defaultBorder: 'border-orange-200',
      selectedBg: 'bg-orange-100',
      selectedBorder: 'border-orange-500',
    },
  ],
}

// Event handlers
const handleDateSelected = async (date: Date | null) => {
  selectedOvertimeDate.value = date

  if (date === null) {
    // Don't clear shifts - keep them in DOM for animation
    // Just reset the selected shift and stop loading
    selectedShiftId.value = ''
    isLoadingShifts.value = false
    return
  }

  // Show loading state
  isLoadingShifts.value = true
  selectedShiftId.value = '' // Reset selected shift when date changes

  // Simulate API call delay for better UX (remove this in production)
  await new Promise((resolve) => setTimeout(resolve, 400)) // Reduced to 400ms for faster loading

  const dateString = date.toISOString().split('T')[0]
  const dateSpecificShifts = shiftsByDate[dateString] || []

  // Combine default shift with date-specific shifts, avoiding duplicates
  const combinedShifts = [...dateSpecificShifts]
  if (!combinedShifts.some((shift) => shift.timeRange === defaultShift.timeRange)) {
    combinedShifts.unshift(defaultShift)
  }

  availableShifts.value = combinedShifts
  isLoadingShifts.value = false // Hide loading state
}
</script>

<style scoped>
.overtime-request-container {
  padding: 2rem;
  overflow-y: auto;
}

.body {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
