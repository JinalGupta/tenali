import { Resend } from 'resend'

const resend = new Resend('re_b8ERV4vB_PckH1dFUdXwovxJuqztCVF18')

// In-memory OTP store: email -> { code, expiresAt, resendCount, lastResendAt }
const otpStore = {}

const OTP_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes
const MAX_RESENDS = 3
const RESEND_COOLDOWN_MS = 30 * 1000 // 30 seconds

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendOTP(email) {
  const now = Date.now()

  // Check existing session
  const session = otpStore[email]
  if (session) {
    // Check resend limit
    if (session.resendCount >= MAX_RESENDS) {
      return { error: 'Maximum resend attempts reached. Please try again later.' }
    }
    // Check cooldown
    if (now - session.lastResendAt < RESEND_COOLDOWN_MS) {
      const remaining = Math.ceil((RESEND_COOLDOWN_MS - (now - session.lastResendAt)) / 1000)
      return { error: `Please wait ${remaining}s before requesting a new code.` }
    }
  }

  const code = generateOTP()
  const expiresAt = now + OTP_EXPIRY_MS

  otpStore[email] = {
    code,
    expiresAt,
    resendCount: session ? session.resendCount + 1 : 1,
    lastResendAt: now,
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your verification code',
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
          <h2 style="color: #1a1a2e;">Your code</h2>
          <p style="font-size: 16px; color: #333;">Use the code below to verify your email:</p>
          <div style="background: #f0f4ff; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2dd4bf; margin: 20px 0; border-radius: 8px;">
            ${code}
          </div>
          <p style="font-size: 12px; color: #888;">This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    })

    if (error) return { error: error.message }
    return { data: { id: data.id } }
  } catch (err) {
    return { error: err.message }
  }
}

export function verifyOTP(email, code) {
  const session = otpStore[email]
  if (!session) return { error: 'No OTP session found. Please request a new code.' }

  const now = Date.now()
  if (now > session.expiresAt) {
    delete otpStore[email]
    return { error: 'Code expired. Please request a new one.' }
  }

  if (session.code !== code) {
    return { error: 'Invalid code. Please try again.' }
  }

  // Success — clear OTP
  delete otpStore[email]
  return { data: { success: true } }
}

export function getOTPStatus(email) {
  const session = otpStore[email]
  if (!session) return { canResend: true, resendCount: 0, secondsLeft: 0 }

  const now = Date.now()
  if (now > session.expiresAt) {
    delete otpStore[email]
    return { canResend: true, resendCount: 0, secondsLeft: 0 }
  }

  return {
    canResend: session.resendCount < MAX_RESENDS,
    resendCount: session.resendCount,
    secondsLeft: Math.max(0, Math.ceil((RESEND_COOLDOWN_MS - (now - session.lastResendAt)) / 1000)),
  }
}