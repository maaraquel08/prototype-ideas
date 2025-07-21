<template>
  <div class="w-full bg-white border-b border-gray-200 p-6">
    <div class="mb-6">
      <h3 class="spr-subheading-xs text-gray-900 mb-2">Details</h3>
      <p class="spr-body-sm text-gray-600">
        Let your approvers know the details of your overtime request
      </p>
    </div>

    <div class="space-y-4">
      <!-- OT Classification Dropdown -->
      <div>
        <spr-select
          :model-value="otClassification"
          placeholder="OT Classification"
          class="w-full"
          @update:model-value="$emit('update:otClassification', $event)"
        >
          <spr-option value="regular">Regular OT</spr-option>
          <spr-option value="holiday">Holiday OT</spr-option>
          <spr-option value="weekend">Weekend OT</spr-option>
        </spr-select>
      </div>

      <!-- Time From and Time To -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <spr-input
            :model-value="timeFrom"
            type="time"
            placeholder="Time From"
            class="w-full"
            @update:model-value="$emit('update:timeFrom', $event)"
          />
        </div>
        <div>
          <spr-input
            :model-value="timeTo"
            type="time"
            placeholder="Time To"
            class="w-full"
            @update:model-value="$emit('update:timeTo', $event)"
          />
        </div>
      </div>

      <!-- OT Minutes -->
      <div>
        <spr-input
          :model-value="otMinutes"
          placeholder="OT Minutes"
          class="w-full bg-gray-50"
          disabled
          @update:model-value="$emit('update:otMinutes', $event)"
        />
      </div>

      <!-- Reason Textarea -->
      <div>
        <spr-textarea
          :model-value="reason"
          placeholder="Reason (Required)"
          rows="4"
          class="w-full"
          @update:model-value="$emit('update:reason', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  otClassification: { type: String, required: true },
  timeFrom: { type: String, required: true },
  timeTo: { type: String, required: true },
  otMinutes: { type: String, required: true },
  reason: { type: String, required: true },
})

defineEmits([
  'update:otClassification',
  'update:timeFrom',
  'update:timeTo',
  'update:otMinutes',
  'update:reason',
])
</script>
