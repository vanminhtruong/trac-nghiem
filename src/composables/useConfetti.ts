import confetti from 'canvas-confetti'

export function useConfetti() {
  // Pháo hoa khi trả lời đúng - màu xanh lá
  const celebrateCorrect = () => {
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    }

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    // Bắn pháo hoa nhiều lần với màu xanh lá
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#10b981', '#34d399', '#6ee7b7']
    })

    fire(0.2, {
      spread: 60,
      colors: ['#10b981', '#34d399', '#6ee7b7']
    })

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#10b981', '#34d399', '#6ee7b7', '#ffffff']
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#10b981', '#34d399', '#6ee7b7']
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#10b981', '#34d399', '#6ee7b7', '#ffffff']
    })
  }

  // Hiệu ứng khi trả lời sai - màu đỏ nhẹ
  const showIncorrect = () => {
    const duration = 1000
    const animationEnd = Date.now() + duration
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 9999,
      colors: ['#ef4444', '#f87171', '#fca5a5']
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 30 * (timeLeft / duration)
      
      // Bắn từ 2 bên
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  // Pháo hoa siêu hoành tráng khi hoàn thành quiz với điểm cao
  const celebrateCompletion = (score: number) => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // Bắn pháo hoa từ nhiều vị trí
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: score >= 80 
          ? ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#fcd34d'] // Xanh vàng cho điểm cao
          : score >= 60
          ? ['#3b82f6', '#60a5fa', '#93c5fd', '#fbbf24'] // Xanh dương cho khá
          : ['#f59e0b', '#fbbf24', '#fcd34d'] // Vàng cho trung bình
      })
    }, 250)
  }

  return {
    celebrateCorrect,
    showIncorrect,
    celebrateCompletion
  }
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}
