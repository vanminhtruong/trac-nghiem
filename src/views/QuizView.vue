<script setup lang="ts">
import { ref, computed, defineAsyncComponent, watch, nextTick } from 'vue'
import { useQuiz } from '../composables/useQuiz'
import { useConfetti } from '../composables/useConfetti'
import { quizQuestions } from '../data/quizData'

const ProgressBar = defineAsyncComponent(() => import('../components/ProgressBar.vue'))
const QuestionCard = defineAsyncComponent(() => import('../components/QuestionCard.vue'))
const QuizResults = defineAsyncComponent(() => import('../components/QuizResults.vue'))
const ReviewAllAnswers = defineAsyncComponent(() => import('../components/ReviewAllAnswers.vue'))

const {
  state,
  currentQuestion,
  progress,
  totalQuestions,
  currentQuestionNumber,
  hasNextQuestion,
  hasPreviousQuestion,
  currentUserAnswer,
  selectAnswer,
  nextQuestion,
  previousQuestion,
  submitQuiz,
  restartQuiz,
  goToQuestion
} = useQuiz(quizQuestions)

const { celebrateCorrect, showIncorrect, celebrateCompletion } = useConfetti()

const canSubmit = computed(() => {
  return state.value.userAnswers.length === quizQuestions.length
})

// Theo dõi câu trả lời và bắn pháo hoa
watch(() => currentUserAnswer.value, (newAnswer, oldAnswer) => {
  if (newAnswer && !oldAnswer && !isReviewMode.value) {
    // Trigger confetti khi trả lời
    nextTick(() => {
      if (newAnswer.isCorrect) {
        celebrateCorrect()
      } else {
        showIncorrect()
      }
    })
  }
})

const handleNextOrSubmit = () => {
  if (hasNextQuestion.value) {
    nextQuestion()
  } else if (canSubmit.value) {
    submitQuiz()
    // Pháo hoa siêu hoành tráng khi hoàn thành
    nextTick(() => {
      celebrateCompletion(state.value.score)
    })
  }
}

// Kiểm tra câu đã được trả lời chưa
const isQuestionAnswered = (questionIndex: number) => {
  return state.value.userAnswers.some(a => a.questionId === quizQuestions[questionIndex].id)
}

// Điều hướng với kiểm tra đã trả lời
const handleGoToQuestion = (index: number) => {
  // Chỉ cho chuyển nếu đã trả lời câu hiện tại hoặc đang ở review mode
  if (isReviewMode.value || currentUserAnswer.value || index < state.value.currentQuestionIndex) {
    goToQuestion(index)
  }
}

const handleReviewAnswers = () => {
  handleShowDetailedReview()
}

const isReviewMode = computed(() => state.value.isCompleted)
const showDetailedReview = ref(false)

const handleShowDetailedReview = () => {
  showDetailedReview.value = true
}

const handleBackToResults = () => {
  showDetailedReview.value = false
}

const handleRestartQuiz = () => {
  showDetailedReview.value = false
  restartQuiz()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 opacity-30 pointer-events-none">
      <div class="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div class="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </div>
    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-8 animate-fade-in-down">
        <div class="inline-block mb-4">
          <div class="text-6xl animate-bounce-slow">🌾</div>
        </div>
        <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-fade-in">
          Trắc nghiệm Nông nghiệp Việt Nam
        </h1>
        <p class="text-lg text-gray-600 animate-fade-in animation-delay-200">
          Kiểm tra kiến thức về phát triển nông nghiệp bền vững
        </p>
      </div>

      <!-- Detailed Review View -->
      <div v-if="state.isCompleted && showDetailedReview">
        <ReviewAllAnswers
          :questions="quizQuestions"
          :userAnswers="state.userAnswers"
          @back-to-results="handleBackToResults"
        />
      </div>

      <!-- Results View -->
      <div v-else-if="state.isCompleted && !showDetailedReview">
        <QuizResults
          :score="state.score"
          :totalQuestions="totalQuestions"
          :userAnswers="state.userAnswers"
          @restart="handleRestartQuiz"
          @review="handleReviewAnswers"
        />
      </div>

      <!-- Quiz View -->
      <div v-else class="space-y-6">
        <!-- Progress Bar -->
        <ProgressBar
          :progress="progress"
          :currentQuestion="currentQuestionNumber"
          :totalQuestions="totalQuestions"
        />

        <!-- Question Card -->
        <QuestionCard
          v-if="currentQuestion"
          :question="currentQuestion"
          :selectedAnswer="currentUserAnswer?.selectedAnswer"
          :isRevealed="isReviewMode"
          @select-answer="selectAnswer"
        />

        <!-- Navigation Buttons -->
        <div class="flex gap-4">
          <button
            v-if="hasPreviousQuestion"
            @click="previousQuestion"
            class="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Câu trước
          </button>

          <div class="flex-1"></div>

          <button
            v-if="hasNextQuestion"
            @click="nextQuestion"
            :disabled="!currentUserAnswer"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2',
              currentUserAnswer
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
          >
            Câu tiếp
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            v-else-if="!isReviewMode"
            @click="submitQuiz"
            :disabled="!canSubmit"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2',
              canSubmit
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Nộp bài
          </button>

          <button
            v-else
            @click="handleRestartQuiz"
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Làm lại
          </button>
        </div>

        <!-- Question Navigator -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Điều hướng câu hỏi</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(_, index) in quizQuestions"
              :key="index"
              @click="handleGoToQuestion(index)"
              :disabled="!isReviewMode && !currentUserAnswer && index !== state.currentQuestionIndex && index > state.currentQuestionIndex"
              :class="[
                'w-10 h-10 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden',
                'hover:scale-110 active:scale-95',
                {
                  'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg ring-4 ring-blue-200 scale-110': state.currentQuestionIndex === index,
                  'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-2 border-green-300 shadow-md': state.userAnswers.some(a => a.questionId === quizQuestions[index].id) && state.currentQuestionIndex !== index,
                  'bg-gray-100 text-gray-600 hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100 hover:shadow-md cursor-pointer': state.currentQuestionIndex !== index && !state.userAnswers.some(a => a.questionId === quizQuestions[index].id) && (isReviewMode || currentUserAnswer || index < state.currentQuestionIndex),
                  'bg-gray-50 text-gray-400 cursor-not-allowed opacity-50': !isReviewMode && !currentUserAnswer && index > state.currentQuestionIndex
                }
              ]"
            >
              {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-bounce-slow {
  animation: bounceSlow 2s ease-in-out infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>
