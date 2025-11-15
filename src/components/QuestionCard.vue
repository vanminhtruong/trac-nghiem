<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { Question } from '../types/quiz'

const AnswerOption = defineAsyncComponent(() => import('./AnswerOption.vue'))

interface Props {
  question: Question
  selectedAnswer?: string
  isRevealed?: boolean
}

interface Emits {
  (e: 'select-answer', answer: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSelectAnswer = (answer: string) => {
  if (!props.isRevealed) {
    emit('select-answer', answer)
  }
}

const getOptionStatus = (label: string) => {
  if (!props.isRevealed) {
    return {
      isSelected: props.selectedAnswer === label,
      isCorrect: false
    }
  }

  return {
    isSelected: props.selectedAnswer === label,
    isCorrect: label === props.question.correctAnswer
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
    <div class="space-y-2">
      <h2 class="text-2xl font-bold text-gray-800 leading-relaxed">
        {{ question.question }}
      </h2>
    </div>

    <div class="space-y-3">
      <AnswerOption
        v-for="option in question.options"
        :key="option.label"
        :label="option.label"
        :text="option.text"
        :isSelected="getOptionStatus(option.label).isSelected"
        :isRevealed="isRevealed"
        :isCorrect="getOptionStatus(option.label).isCorrect"
        @select="handleSelectAnswer(option.label)"
      />
    </div>

    <div v-if="selectedAnswer" class="mt-6 p-4 rounded-lg animate-fade-in">
      <div 
        v-if="selectedAnswer === question.correctAnswer"
        class="flex items-start gap-3 text-green-700 bg-green-50 p-4 rounded-lg border border-green-200"
      >
        <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="font-semibold">Chính xác!</p>
          <p class="text-sm mt-1">Bạn đã chọn đúng đáp án.</p>
        </div>
      </div>
      <div 
        v-else
        class="flex items-start gap-3 text-red-700 bg-red-50 p-4 rounded-lg border border-red-200"
      >
        <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="font-semibold">Chưa đúng!</p>
          <p class="text-sm mt-1">Đáp án đúng là: <span class="font-bold">{{ question.correctAnswer }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>
