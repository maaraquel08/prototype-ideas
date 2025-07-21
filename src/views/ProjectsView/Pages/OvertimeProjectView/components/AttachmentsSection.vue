<template>
  <div class="w-full bg-white border-b border-gray-200 p-6">
    <h3 class="spr-subheading-xs text-gray-900 mb-4">Attachments</h3>

    <!-- File Upload Area -->
    <div class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
      <div class="flex flex-col items-center">
        <div
          class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3"
        >
          <spr-icon name="ph:image" class="w-6 h-6 text-green-600" />
        </div>
        <p class="spr-body-sm text-gray-700 mb-1">
          Drop your image here or
          <button class="text-green-600 hover:text-green-700 font-medium">
            browse
          </button>
          <span class="text-gray-500">(optional)</span>
        </p>
        <p class="spr-body-xs text-gray-500">Supports: JPG, PNG, PDF</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// No script logic needed for this component yet.
</script>
