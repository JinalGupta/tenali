import { useState, useRef, useEffect } from 'react'

export default function OTPInput({ length = 6, value, onChange, error, disabled }) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const inputRefs = useRef([])

  useEffect(() => {
    if (focusedIndex >= 0 && inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex].focus()
    }
  }, [focusedIndex])

  const handleChange = (index, e) => {
    const val = e.target.value

    // Only allow single digit
    if (val.length > 1) return

    const newValue = value.split('')
    newValue[index] = val
    onChange(newValue.join(''))

    // Auto-advance to next input
    if (val && index < length - 1) {
      setFocusedIndex(index + 1)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Move back if current is empty
        setFocusedIndex(index - 1)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setFocusedIndex(index - 1)
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setFocusedIndex(index + 1)
    } else if (e.key === 'Enter') {
      // Submit on Enter
      e.preventDefault()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, length)
    if (/^\d+$/.test(pasted)) {
      onChange(pasted.padEnd(length, ''))
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 justify-center" onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ''}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={() => setFocusedIndex(i)}
            disabled={disabled}
            aria-label={`OTP digit ${i + 1}`}
            aria-invalid={!!error}
            className={`
              w-12 h-14 text-center text-2xl font-mono bg-navy-800 border-2 rounded-lg
              transition-all duration-200 outline-none
              ${error
                ? 'border-coral-400 focus:border-coral-400 focus:ring-2 focus:ring-coral-400/30'
                : focusedIndex === i
                  ? 'border-teal-400 focus:ring-2 focus:ring-teal-400/30'
                  : 'border-navy-700 hover:border-navy-600'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
              text-cream-100
            `}
          />
        ))}
      </div>

      {error && (
        <p role="alert" className="text-coral-400 text-sm text-center font-sans">
          {error}
        </p>
      )}
    </div>
  )
}