import { useState, useEffect } from 'react'

export default function ResendTimer({ onResend, cooldownSeconds = 30 }) {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [canResend, setCanResend] = useState(true)

  useEffect(() => {
    if (canResend) return

    setSecondsLeft(cooldownSeconds)
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [canResend, cooldownSeconds])

  useEffect(() => {
    if (secondsLeft <= 0 && !canResend) {
      setCanResend(true)
    }
  }, [secondsLeft, canResend])

  const handleResend = () => {
    if (!canResend) return
    setCanResend(false)
    onResend()
  }

  return (
    <div className="flex flex-col items-center gap-1">
      {!canResend ? (
        <p className="text-cream-300 text-sm font-sans">
          Resend code in{' '}
          <span className="font-mono text-amber-400" aria-live="polite">
            {secondsLeft}s
          </span>
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="text-teal-400 text-sm font-sans hover:text-teal-300 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded transition-colors"
          aria-label="Resend OTP code"
        >
          Resend OTP
        </button>
      )}
    </div>
  )
}