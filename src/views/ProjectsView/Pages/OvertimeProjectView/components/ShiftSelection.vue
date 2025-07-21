<template>
  <div>
    <spr-radio-group
      v-if="shifts.length > 0"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <div
        v-for="shift in shifts"
        :key="shift.id"
        :class="[
          'shift-card-container hover:spr-background-color-hover flex items-center gap-3 p-4 border-b spr-border-color-weak overflow-hidden cursor-pointer',
          modelValue === shift.id
            ? 'border-spr-border-color-brand'
            : 'border-spr-border-color-weak',
        ]"
        @click="$emit('update:modelValue', shift.id)"
      >
        <!-- Radio Button -->
        <spr-radio :model-value="modelValue" :value="shift.id" />

        <!-- Shift Card -->
        <label :for="`shift-${shift.id}`" class="flex-1 cursor-pointer">
          <div
            :class="[
              'rounded-lg p-3 border-2 transition-all duration-200 ease-in-out',
              modelValue === shift.id
                ? `${shift.selectedBg} ${shift.selectedBorder}`
                : `${shift.defaultBg} ${shift.defaultBorder}`,
            ]"
          >
            <div class="spr-body-sm font-medium text-gray-900">{{ shift.timeRange }}</div>
            <div class="spr-body-sm text-gray-600">{{ shift.branch }}</div>
            <div class="spr-body-sm text-gray-600">{{ shift.shiftType }}</div>
          </div>
        </label>
      </div>
    </spr-radio-group>
    <div v-else class="text-center text-gray-500 py-8">
      <p class="spr-body-md">No shifts available for this date.</p>
      <p class="spr-body-sm">Please select another date.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

// TypeScript interfaces
interface Shift {
  id: string
  timeRange: string
  branch: string
  shiftType: string
  defaultBg: string
  defaultBorder: string
  selectedBg: string
  selectedBorder: string
}

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  shifts: {
    type: Array as PropType<Shift[]>,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.shift-card-container:hover {
  transform: scale(1.01);
}
.shift-card-container {
  transition: transform 0.3s ease;
}
</style>
