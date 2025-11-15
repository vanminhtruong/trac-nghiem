import { ref, computed } from 'vue'
import type { Question, UserAnswer, QuizState } from '@/types/quiz'

export function useQuiz(questions: Question[]) {
  const state = ref<QuizState>({
    currentQuestionIndex: 0,
    userAnswers: [],
    isCompleted: false,
    score: 0
  })

  const currentQuestion = computed(() => {
    return questions[state.value.currentQuestionIndex]
  })

  const progress = computed(() => {
    return ((state.value.currentQuestionIndex + 1) / questions.length) * 100
  })

  const totalQuestions = computed(() => questions.length)

  const currentQuestionNumber = computed(() => state.value.currentQuestionIndex + 1)

  const hasNextQuestion = computed(() => {
    return state.value.currentQuestionIndex < questions.length - 1
  })

  const hasPreviousQuestion = computed(() => {
    return state.value.currentQuestionIndex > 0
  })

  const currentUserAnswer = computed(() => {
    return state.value.userAnswers.find(
      answer => answer.questionId === currentQuestion.value?.id
    )
  })

  const selectAnswer = (answer: string) => {
    if (state.value.isCompleted) return

    const questionId = currentQuestion.value.id
    const isCorrect = answer === currentQuestion.value.correctAnswer

    // Remove existing answer for this question if any
    state.value.userAnswers = state.value.userAnswers.filter(
      a => a.questionId !== questionId
    )

    // Add new answer
    state.value.userAnswers.push({
      questionId,
      selectedAnswer: answer,
      isCorrect
    })
  }

  const nextQuestion = () => {
    if (hasNextQuestion.value) {
      state.value.currentQuestionIndex++
    }
  }

  const previousQuestion = () => {
    if (hasPreviousQuestion.value) {
      state.value.currentQuestionIndex--
    }
  }

  const submitQuiz = () => {
    // Calculate final score
    const correctAnswers = state.value.userAnswers.filter(a => a.isCorrect).length
    state.value.score = (correctAnswers / questions.length) * 100
    state.value.isCompleted = true
  }

  const restartQuiz = () => {
    state.value = {
      currentQuestionIndex: 0,
      userAnswers: [],
      isCompleted: false,
      score: 0
    }
  }

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      state.value.currentQuestionIndex = index
    }
  }

  return {
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
  }
}
