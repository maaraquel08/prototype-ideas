<template>
  <div class="app-container">
    <!-- Main Content -->
    <div class="overtime-request-container spr-background-color-surface">
      <!--Body-->
      <div class="body spr-max-w-md mx-auto">
        <!-- Header Section -->
        <div class="header-section">
          <div class="back-button">
            <!-- Back arrow and "Create Request" title -->
          </div>
          <div class="info-icon">
            <!-- Information icon -->
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="main-content">
          <!-- Left Column: Calendar Section -->
          <div class="left-column space-y-6 h-fit">
            <!-- Calendar Card Structure -->
            <div
              class="w-full h-fit spr-background-color rounded-2xl overflow-hidden calendar-card"
            >
              <!-- Header Section -->
              <div class="bg-white border-b border-gray-200 p-4">
                <h3 class="spr-subheading-xs">Overtime Dates</h3>
                <p class="spr-body-sm-regular">Select the date you want to apply for an overtime</p>
              </div>

              <!-- Card Body -->
              <div class="card-body spr-background-color">
                <div class="p-4 border-b spr-border-color-weak overflow-hidden">
                  <Calendar v-model="selectedOvertimeDate" @date-selected="handleDateSelected" />
                </div>
                <!-- Shift Card Lists -->
                <div
                  class="shift-selection-wrapper"
                  :class="{ 'is-expanded': selectedOvertimeDate }"
                >
                  <div class="shift-selection-content">
                    <ShiftSelection v-model="selectedShiftId" :shifts="availableShifts" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Details Section -->
          <div class="right-column">
            <div class="spr-background-color rounded-2xl overflow-hidden">
              <ShiftPreview />
              <DetailsForm
                v-model:otClassification="otClassification"
                v-model:timeFrom="timeFrom"
                v-model:timeTo="timeTo"
                v-model:otMinutes="otMinutes"
                v-model:reason="reason"
              />
              <AttachmentsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
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
const handleDateSelected = (date: Date) => {
  selectedOvertimeDate.value = date
  const dateString = date.toISOString().split('T')[0]
  const dateSpecificShifts = shiftsByDate[dateString] || []

  // Combine default shift with date-specific shifts, avoiding duplicates
  const combinedShifts = [...dateSpecificShifts]
  if (!combinedShifts.some((shift) => shift.timeRange === defaultShift.timeRange)) {
    combinedShifts.unshift(defaultShift)
  }

  availableShifts.value = combinedShifts
  selectedShiftId.value = '' // Reset selected shift when date changes
}
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.overtime-request-container {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
}

.body {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.shift-selection-wrapper {
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.calendar-card {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: height 0.3s ease-out;
}

.card-body {
  background-color: #f9fafb; /* spr-background-color-surface */
  transition: height 0.3s ease-out;
}

/* Additional responsive styles if needed */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
</style>
