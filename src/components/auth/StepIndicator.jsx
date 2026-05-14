export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-center gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={steps.length}>
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isCompleted = stepNum < currentStep
        const isCurrent = stepNum === currentStep

        return (
          <div key={i} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-semibold
                  transition-all duration-300
                  ${isCompleted
                    ? 'bg-teal-400 text-navy-950'
                    : isCurrent
                      ? 'bg-teal-400/20 border-2 border-teal-400 text-teal-400'
                      : 'bg-navy-800 border-2 border-navy-700 text-cream-300/50'
                  }
                `}
                aria-hidden="true"
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`
                  text-sm font-sans hidden sm:block
                  ${isCurrent ? 'text-teal-400' : isCompleted ? 'text-cream-100' : 'text-cream-300/50'}
                `}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 transition-colors duration-300 ${isCompleted ? 'bg-teal-400' : 'bg-navy-700'}`} aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}