<template>
  <div class="wrapper">
    <div
      role="radiogroup"
      class="rounded-xl overflow-hidden border spr-border-color-weak shift-selection-card"
      :class="{ 'is-expanded': isExpanded }"
    >
      <!-- Skeleton Loader -->
      <div v-if="isLoading" class="skeleton-container spr-background-color">
        <div
          v-for="n in 1"
          :key="`skeleton-${n}`"
          :class="[
            'skeleton-item flex items-center gap-3 p-4 overflow-hidden',
            n === 1 ? 'pt-16' : '',
            n < 2 ? 'border-b spr-border-color-weak' : '',
          ]"
        >
          <!-- Skeleton Radio Button -->
          <div
            class="skeleton-radio w-4 h-4 rounded-full border-2 border-gray-300 bg-white animate-pulse relative"
          >
            <div class="absolute inset-1 rounded-full bg-gray-200 animate-pulse"></div>
          </div>

          <!-- Skeleton Shift Card -->
          <div class="flex-1">
            <div
              class="skeleton-card rounded-lg p-3 border-2 border-gray-200 bg-gray-50 h-[88px]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Actual Shift Items -->
      <div
        v-else
        v-for="(shift, index) in shifts"
        :key="shift.id"
        :class="[
          'shift-card-container spr-background-color hover:spr-background-color-hover flex items-center gap-3 p-4 overflow-hidden cursor-pointer',
          index === 0 ? 'pt-16' : '',
          modelValue === shift.id ? 'spr-border-color-weak' : 'spr-border-color-weak',
          index < shifts.length - 1 ? 'border-b' : '',
        ]"
        @click="$emit('update:modelValue', shift.id)"
      >
        <!-- Radio Button -->
        <spr-radio
          :model-value="modelValue"
          :value="shift.id"
          @update:model-value="$emit('update:modelValue', $event)"
          class="spr-radio"
        />

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
  isExpanded: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.shift-card-container:hover {
  transform: scale(1.01);
}

.shift-card-container:active {
  transform: scale(0.99);
}
.shift-card-container {
  transition: transform 0.3s ease;
}

.shift-selection-card {
  transform: translateY(calc(-100% - 16px));
  transition:
    transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 0.5s ease;
  pointer-events: none;
}

.shift-selection-card.is-expanded {
  transform: translateY(-64px);
  opacity: 1;
  pointer-events: auto;
}

.wrapper {
  height: auto;
  transition: height 0.35s ease;
}
</style>
