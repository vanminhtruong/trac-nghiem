<script setup lang="ts">
interface Props {
  progress: number
  currentQuestion: number
  totalQuestions: number
}

defineProps<Props>()
</script>

<template>
  <div class="w-full bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
          {{ currentQuestion }}
        </div>
        <span class="text-base font-semibold text-gray-700">
          / {{ totalQuestions }} câu
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {{ Math.round(progress) }}%
        </span>
        <span class="text-sm text-gray-500">hoàn thành</span>
      </div>
    </div>
    <div class="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
      <div 
        class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out rounded-full relative overflow-hidden"
        :style="{ width: `${progress}%` }"
      >
        <!-- Animated shine effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

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

.animate-slide {
  animation: slide 2s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
