<script setup lang="ts">
import { computed } from 'vue'
import type { UserAnswer } from '../types/quiz'

interface Props {
  score: number
  totalQuestions: number
  userAnswers: UserAnswer[]
}

interface Emits {
  (e: 'restart'): void
  (e: 'review'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const correctCount = computed(() => 
  props.userAnswers.filter(a => a.isCorrect).length
)

const scoreCategory = computed(() => {
  if (props.score >= 80) return {
    label: 'Xuất sắc!',
    color: 'green',
    icon: '🏆',
    message: 'Bạn đã nắm vững kiến thức!'
  }
  if (props.score >= 60) return {
    label: 'Khá tốt!',
    color: 'blue',
    icon: '👍',
    message: 'Bạn đã làm khá tốt, tiếp tục cố gắng!'
  }
  if (props.score >= 40) return {
    label: 'Trung bình',
    color: 'yellow',
    icon: '📚',
    message: 'Bạn cần ôn tập thêm một chút.'
  }
  return {
    label: 'Cần cố gắng',
    color: 'red',
    icon: '💪',
    message: 'Đừng nản chí, hãy thử lại nhé!'
  }
})

const colorClasses = computed(() => {
  const color = scoreCategory.value.color
  return {
    bg: `bg-${color}-50`,
    border: `border-${color}-200`,
    text: `text-${color}-700`,
    badge: `bg-${color}-500`
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto animate-scale-in">
    <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-8 border-4 border-gradient">
      <!-- Score Display -->
      <div class="text-center space-y-4">
        <div class="text-6xl">{{ scoreCategory.icon }}</div>
        <h2 class="text-3xl font-bold text-gray-800">
          {{ scoreCategory.label }}
        </h2>
        <p class="text-gray-600 text-lg">
          {{ scoreCategory.message }}
        </p>
      </div>

      <!-- Score Circle -->
      <div class="flex justify-center">
        <div class="relative w-48 h-48">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <!-- Background circle -->
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              stroke-width="8"
            />
            <!-- Progress circle -->
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              :stroke="scoreCategory.color === 'green' ? '#10b981' : scoreCategory.color === 'blue' ? '#3b82f6' : scoreCategory.color === 'yellow' ? '#f59e0b' : '#ef4444'"
              stroke-width="8"
              :stroke-dasharray="`${(score / 100) * 283} 283`"
              stroke-linecap="round"
              class="transition-all duration-1000 ease-out"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <div class="text-4xl font-bold text-gray-800">{{ Math.round(score) }}%</div>
            <div class="text-sm text-gray-500 mt-1">Điểm số</div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center p-4 bg-gray-50 rounded-xl">
          <div class="text-2xl font-bold text-gray-800">{{ totalQuestions }}</div>
          <div class="text-sm text-gray-600 mt-1">Tổng câu</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-xl">
          <div class="text-2xl font-bold text-green-600">{{ correctCount }}</div>
          <div class="text-sm text-gray-600 mt-1">Đúng</div>
        </div>
        <div class="text-center p-4 bg-red-50 rounded-xl">
          <div class="text-2xl font-bold text-red-600">{{ totalQuestions - correctCount }}</div>
          <div class="text-sm text-gray-600 mt-1">Sai</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4">
        <button
          @click="emit('review')"
          class="flex-1 px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200"
        >
          Xem lại đáp án
        </button>
        <button
          @click="emit('restart')"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Làm lại
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.border-gradient {
  border-image: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899) 1;
}
</style>
