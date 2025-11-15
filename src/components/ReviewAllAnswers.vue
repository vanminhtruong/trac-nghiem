<script setup lang="ts">
import type { Question } from '../types/quiz'
import type { UserAnswer } from '../types/quiz'

interface Props {
  questions: Question[]
  userAnswers: UserAnswer[]
}

interface Emits {
  (e: 'back-to-results'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const getAnswerForQuestion = (questionId: number) => {
  return props.userAnswers.find(a => a.questionId === questionId)
}

const getOptionText = (question: Question, label: string) => {
  return question.options.find(opt => opt.label === label)?.text || ''
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Chi tiết câu trả lời</h2>
        <p class="text-gray-600 mt-1">Xem lại tất cả câu hỏi và đáp án của bạn</p>
      </div>
      <button
        @click="emit('back-to-results')"
        class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại kết quả
      </button>
    </div>

    <!-- All Questions Review -->
    <div class="space-y-4">
      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="bg-white rounded-2xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300"
      >
        <!-- Question Header -->
        <div class="flex items-start gap-4">
          <div 
            :class="[
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md',
              getAnswerForQuestion(question.id)?.isCorrect 
                ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                : 'bg-gradient-to-br from-red-400 to-pink-500'
            ]"
          >
            {{ index + 1 }}
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800 leading-relaxed">
              {{ question.question }}
            </h3>
          </div>
          <div 
            :class="[
              'flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold',
              getAnswerForQuestion(question.id)?.isCorrect 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            ]"
          >
            {{ getAnswerForQuestion(question.id)?.isCorrect ? '✓ Đúng' : '✗ Sai' }}
          </div>
        </div>

        <!-- Answer Options -->
        <div class="pl-14 space-y-2">
          <div
            v-for="option in question.options"
            :key="option.label"
            :class="[
              'p-4 rounded-xl border-2 transition-all duration-300',
              {
                // Đáp án đúng
                'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50': option.label === question.correctAnswer,
                // Đáp án người dùng chọn (sai)
                'border-red-400 bg-gradient-to-r from-red-50 to-pink-50': option.label === getAnswerForQuestion(question.id)?.selectedAnswer && option.label !== question.correctAnswer,
                // Các đáp án khác
                'border-gray-200 bg-gray-50': option.label !== question.correctAnswer && option.label !== getAnswerForQuestion(question.id)?.selectedAnswer
              }
            ]"
          >
            <div class="flex items-start gap-3">
              <div 
                :class="[
                  'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm',
                  {
                    'bg-green-500 text-white': option.label === question.correctAnswer,
                    'bg-red-500 text-white': option.label === getAnswerForQuestion(question.id)?.selectedAnswer && option.label !== question.correctAnswer,
                    'bg-gray-300 text-gray-600': option.label !== question.correctAnswer && option.label !== getAnswerForQuestion(question.id)?.selectedAnswer
                  }
                ]"
              >
                {{ option.label }}
              </div>
              <div class="flex-1">
                <p 
                  :class="[
                    'text-base',
                    {
                      'text-green-900 font-medium': option.label === question.correctAnswer,
                      'text-red-900 font-medium': option.label === getAnswerForQuestion(question.id)?.selectedAnswer && option.label !== question.correctAnswer,
                      'text-gray-700': option.label !== question.correctAnswer && option.label !== getAnswerForQuestion(question.id)?.selectedAnswer
                    }
                  ]"
                >
                  {{ option.text }}
                </p>
                <!-- Labels -->
                <div class="flex gap-2 mt-2">
                  <span 
                    v-if="option.label === question.correctAnswer"
                    class="inline-flex items-center gap-1 px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full"
                  >
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Đáp án đúng
                  </span>
                  <span 
                    v-if="option.label === getAnswerForQuestion(question.id)?.selectedAnswer && option.label !== question.correctAnswer"
                    class="inline-flex items-center gap-1 px-2 py-1 bg-red-200 text-red-800 text-xs font-semibold rounded-full"
                  >
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    Bạn đã chọn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
