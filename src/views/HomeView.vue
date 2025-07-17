<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToComponents = () => {
  router.push('/components')
}

const navigateToProjects = () => {
  router.push('/projects')
}
</script>

<template>
  <div class="p-4 rounded-2xl flex flex-col bg-amber-100 w-fit">
    <h1 class="text-3xl font-bold p-4 m-2 text-amber-300">Welcome to Sprout Design System</h1>

    <div class="flex gap-4">
      <!-- Components Card -->
      <div class="cursor-pointer" @click="navigateToComponents">
        <spr-card title="Components">
          <template #content>
            <p class="text-gray-600">Explore design system components</p>
          </template>
        </spr-card>
      </div>

      <!-- Projects Card -->
      <div class="cursor-pointer" @click="navigateToProjects">
        <spr-card title="Projects">
          <template #content>
            <p class="text-gray-600">View example projects</p>
          </template>
        </spr-card>
      </div>
    </div>
  </div>
</template>
