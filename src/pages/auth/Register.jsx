import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OTPInput from '../../components/auth/OTPInput'
import ResendTimer from '../../components/auth/ResendTimer'

export default function Register() {
  const navigate = useNavigate()

  // Step 1:填写信息, Step 2: OTP验证
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ fullName: '', email: '' })
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateStep1()) {
      setStatus('loading')
      // Simulate sending OTP
      setTimeout(() => {
        setStatus('idle')
        setStep(2)
      }, 1500)
    }
  }

  const handleOTPVerify = () => {
    if (otp.length < 6) {
      setErrors({ otp: 'Please enter the complete 6-digit code' })
      return
    }
    setStatus('loading')
    // Simulate verifying OTP
    setTimeout(() => {
      if (otp === '123456') {
        setStatus('success')
        setTimeout(() => navigate('/'), 2000)
      } else {
        setStatus('error')
        setErrors({ otp: 'Invalid code. Please try again.' })
        setOtp('')
      }
    }, 1500)
  }

  const handleResend = () => {
    setOtp('')
    setErrors({})
    setStatus('idle')
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-cream-100 mb-3">Create Account</h1>
          <p className="font-sans text-cream-300 text-lg">
            {step === 1 ? 'Enter your details to get started' : 'We sent a code to your email'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-8 shadow-xl">
          {step === 1 ? (
            /* Step 1: Name & Email */
            <div className="flex flex-col gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="font-sans text-sm text-cream-200">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Priya Sharma"
                  autoComplete="name"
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  aria-invalid={!!errors.fullName}
                  className={`
                    w-full px-4 py-3 bg-navy-800 border-2 rounded-lg font-sans text-cream-100
                    placeholder:text-cream-300/40 outline-none transition-all duration-200
                    focus:ring-2 focus:ring-teal-400/30
                    ${errors.fullName ? 'border-coral-400 focus:border-coral-400' : 'border-navy-700 hover:border-navy-600 focus:border-teal-400'}
                  `}
                />
                {errors.fullName && (
                  <p id="fullName-error" role="alert" className="text-coral-400 text-xs font-sans">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans text-sm text-cream-200">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="priya@example.com"
                  autoComplete="email"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                  className={`
                    w-full px-4 py-3 bg-navy-800 border-2 rounded-lg font-sans text-cream-100
                    placeholder:text-cream-300/40 outline-none transition-all duration-200
                    focus:ring-2 focus:ring-teal-400/30
                    ${errors.email ? 'border-coral-400 focus:border-coral-400' : 'border-navy-700 hover:border-navy-600 focus:border-teal-400'}
                  `}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="text-coral-400 text-xs font-sans">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Continue Button */}
              <button
                type="button"
                onClick={handleContinue}
                disabled={status === 'loading'}
                className={`
                  w-full py-3.5 rounded-lg font-sans font-semibold text-navy-950 transition-all duration-200
                  flex items-center justify-center gap-2
                  ${status === 'loading'
                    ? 'bg-teal-400/50 cursor-not-allowed'
                    : 'bg-teal-400 hover:bg-teal-300 active:scale-[0.98]'
                  }
                `}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending code...
                  </>
                ) : (
                  'Continue'
                )}
              </button>

              {/* Success state for step 1 */}
              {status === 'success' && (
                <p role="status" className="text-teal-400 text-sm text-center font-sans">
                  Code sent! Check your email.
                </p>
              )}
            </div>
          ) : (
            /* Step 2: OTP Verification */
            <div className="flex flex-col gap-8">
              {/* Back button */}
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(''); setErrors({}) }}
                className="flex items-center gap-1 text-cream-300 hover:text-teal-400 font-sans text-sm transition-colors self-start"
                aria-label="Go back to previous step"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              {/* Email display */}
              <div className="text-center">
                <p className="text-cream-300 text-sm font-sans mb-1">Verifying</p>
                <p className="text-cream-100 text-lg font-sans font-medium">{formData.email}</p>
              </div>

              {/* OTP Input */}
              <OTPInput
                value={otp}
                onChange={(val) => { setOtp(val); setErrors({}) }}
                error={errors.otp}
                disabled={status === 'loading'}
              />

              {/* Resend Timer */}
              <ResendTimer onResend={handleResend} cooldownSeconds={30} />

              {/* Verify Button */}
              <button
                type="button"
                onClick={handleOTPVerify}
                disabled={status === 'loading' || otp.length < 6}
                className={`
                  w-full py-3.5 rounded-lg font-sans font-semibold text-navy-950 transition-all duration-200
                  flex items-center justify-center gap-2
                  ${status === 'loading' || otp.length < 6
                    ? 'bg-teal-400/50 cursor-not-allowed'
                    : 'bg-teal-400 hover:bg-teal-300 active:scale-[0.98]'
                  }
                `}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              {/* Success */}
              {status === 'success' && (
                <div className="flex items-center justify-center gap-2 text-teal-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-sans text-sm">Account created successfully!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-cream-300/60 text-sm font-sans mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-teal-400 hover:text-teal-300 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}