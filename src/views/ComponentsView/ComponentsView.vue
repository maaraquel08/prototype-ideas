<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Components</h1>
    <div class="flex flex-wrap gap-4">
      <!-- Dropdown List Card -->
      <div class="cursor-pointer" @click="navigateToDropdownList">
        <spr-card title="Dropdown List Container">
          <template #content>
            <p class="text-gray-600">A container for dropdown list items.</p>
          </template>
        </spr-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToDropdownList = () => {
  router.push('/components/dropdown-list')
}

</script>
