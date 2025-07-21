<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Projects</h1>
    <div class="flex flex-wrap gap-4">
      <!-- Overtime Project Card -->
      <div class="cursor-pointer" @click="navigateToOvertimeProject">
        <spr-card title="Overtime Project">
          <template #content>
            <p class="text-gray-600">Manage and track overtime projects.</p>
          </template>
        </spr-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToOvertimeProject = () => {
  router.push('/projects/overtime')
}
</script>
