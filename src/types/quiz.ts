export interface Question {
  id: number
  question: string
  options: {
    label: string
    text: string
  }[]
  correctAnswer: string
}

export interface UserAnswer {
  questionId: number
  selectedAnswer: string
  isCorrect: boolean
}

export interface QuizState {
  currentQuestionIndex: number
  userAnswers: UserAnswer[]
  isCompleted: boolean
  score: number
}
