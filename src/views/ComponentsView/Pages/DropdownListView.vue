<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4">
    <div class="w-72 space-y-4">
      <div>
        <label for="network-delay-input" class="block text-sm font-medium text-gray-700 mb-1">
          Network Delay (ms)
        </label>
        <spr-input
          id="network-delay-input"
          type="number"
          v-model.number="networkDelay"
          placeholder="e.g., 2000"
        />
      </div>
      <div>
        <label for="items-per-load-input" class="block text-sm font-medium text-gray-700 mb-1">
          Items to Load on Scroll
        </label>
        <spr-input
          id="items-per-load-input"
          type="number"
          v-model.number="itemsPerLoad"
          placeholder="e.g., 5"
        />
      </div>
      <spr-button @click="refreshList" class="w-full">Refresh</spr-button>
    </div>
    <div
      ref="scrollContainer"
      @scroll="handleScroll"
      :class="[
        'w-72 spr-p-2 spr-rounded-md spr-overflow-auto',
        'spr-border spr-border-solid spr-border-color-weak',
      ]"
      :style="containerStyle"
    >
      <!-- Skeleton Loader for Initial Load -->
      <div v-if="isLoading && isInitialLoad">
        <div
          v-for="n in initialItems"
          :key="n"
          class="h-8 bg-gray-200 rounded-lg animate-pulse my-2"
        ></div>
      </div>

      <!-- List and Spinner for subsequent loads -->
      <div v-if="!isInitialLoad">
        <spr-list v-model="singleSelectOutput" :menu-list="visibleMenuList" />
        <div v-if="isLoading" class="flex justify-center items-center p-2">
          <Icon
            icon="svg-spinners:ring-resize"
            width="20"
            height="20"
            class="text-2xl"
            style="color: #35ae29"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'

const singleSelectOutput = ref([])
const isLoading = ref(false)
const isInitialLoad = ref(true)
const scrollContainer = ref<HTMLElement | null>(null)
const networkDelay = ref(2000)
const itemsPerLoad = ref(5)

const initialItems = 10 // Fixed initial items

// --- Dynamic Height Calculation ---
const itemHeight = 40 // Estimated height of a single list item in pixels
const maxHeight = 300 // Maximum container height in pixels

const containerStyle = computed(() => {
  const calculatedHeight = initialItems * itemHeight
  const finalHeight = Math.min(calculatedHeight, maxHeight)
  return {
    height: `${finalHeight}px`,
  }
})
// --------------------------------

const allItems = [
  { text: 'Apple', value: 'apple' },
  { text: 'Banana', value: 'banana' },
  { text: 'Cherry', value: 'cherry' },
  { text: 'Date', value: 'date' },
  { text: 'Elderberry', value: 'elderberry' },
  { text: 'Fig', value: 'fig' },
  { text: '5 Grape', value: 'grape' },
  { text: 'Honeydew', value: 'honeydew' },
  { text: 'Indian Fig', value: 'indian_fig' },
  { text: 'Jackfruit', value: 'jackfruit' },
  { text: 'Kiwi', value: 'kiwi' },
  { text: 'Lemon', value: 'lemon' },
  { text: 'Mango', value: 'mango' },
  { text: 'Nectarine', value: 'nectarine' },
  { text: '89 Watermelon', value: 'watermelon' },
  { text: 'Xigua', value: 'xigua' },
  { text: 'Yunnan Hackberry', value: 'yunnan_hackberry' },
  { text: '1 Zucchini', value: 'zucchini' },
  { text: 'Apricot', value: 'apricot' },
  { text: 'Blueberry', value: 'blueberry' },
  { text: 'Cantaloupe', value: 'cantaloupe' },
  { text: 'Dragonfruit', value: 'dragonfruit' },
  { text: 'Pineapple', value: 'pineapple' },
]

const visibleMenuList = ref<typeof allItems>([])

const loadItems = (count: number) => {
  if (isLoading.value) return
  isLoading.value = true

  const minLoadingTime = 1000

  const dataFetchPromise = new Promise((resolve) => {
    setTimeout(() => {
      const currentLength = visibleMenuList.value.length
      const nextItems = allItems.slice(currentLength, currentLength + count)
      visibleMenuList.value.push(...nextItems)
      resolve(true)
    }, networkDelay.value)
  })

  const minTimePromise = new Promise((resolve) => {
    setTimeout(resolve, minLoadingTime)
  })

  return Promise.all([dataFetchPromise, minTimePromise]).then(() => {
    isLoading.value = false
    if (isInitialLoad.value) {
      isInitialLoad.value = false
    }
  })
}

const handleScroll = () => {
  const container = scrollContainer.value
  if (container) {
    const { scrollTop, clientHeight, scrollHeight } = container
    if (scrollTop + clientHeight >= scrollHeight - 1 && !isLoading.value) {
      if (visibleMenuList.value.length < allItems.length) {
        loadItems(itemsPerLoad.value)
      }
    }
  }
}

const refreshList = () => {
  isInitialLoad.value = true
  visibleMenuList.value = []
  singleSelectOutput.value = []
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0
  }
  loadItems(initialItems)
}

onMounted(() => {
  loadItems(initialItems)
})
</script>
