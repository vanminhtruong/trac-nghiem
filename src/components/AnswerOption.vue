<script setup lang="ts">
interface Props {
  label: string
  text: string
  isSelected: boolean
  isRevealed?: boolean
  isCorrect?: boolean
}

interface Emits {
  (e: 'select'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('select')
}
</script>

<template>
  <button
    @click="handleClick"
    :class="[
      'w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left flex items-start gap-4 group relative overflow-hidden',
      'hover:shadow-lg active:scale-[0.98]',
      {
        'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg transform scale-[1.02] ring-2 ring-blue-200 animate-pulse-subtle': isSelected && !isRevealed,
        'border-gray-200 bg-white hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 hover:shadow-md': !isSelected && !isRevealed,
        'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg animate-success': isRevealed && isCorrect,
        'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 shadow-md': isRevealed && !isCorrect && isSelected,
        'border-gray-200 bg-gray-50 opacity-60': isRevealed && !isCorrect && !isSelected
      }
    ]"
    :disabled="isRevealed"
  >
    <!-- Shimmer effect when selected -->
    <div 
      v-if="isSelected && !isRevealed"
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
    />
    <div 
      :class="[
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300',
        {
          'bg-blue-500 text-white': isSelected && !isRevealed,
          'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600': !isSelected && !isRevealed,
          'bg-green-500 text-white': isRevealed && isCorrect,
          'bg-red-500 text-white': isRevealed && !isCorrect && isSelected,
          'bg-gray-300 text-gray-500': isRevealed && !isCorrect && !isSelected
        }
      ]"
    >
      {{ label }}
    </div>
    <span 
      :class="[
        'flex-1 text-base transition-colors duration-300',
        {
          'text-blue-900 font-medium': isSelected && !isRevealed,
          'text-gray-700 group-hover:text-blue-900': !isSelected && !isRevealed,
          'text-green-900 font-medium': isRevealed && isCorrect,
          'text-red-900 font-medium': isRevealed && !isCorrect && isSelected,
          'text-gray-600': isRevealed && !isCorrect && !isSelected
        }
      ]"
    >
      {{ text }}
    </span>
  </button>
</template>

<style scoped>
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.95;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes success {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}

.animate-success {
  animation: success 0.5s ease-out;
}
</style>
