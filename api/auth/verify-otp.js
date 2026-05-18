/**
 * verify-otp.js — Vercel serverless function: verify OTP and issue session token
 *
 * POST /api/auth/verify-otp
 * Body: { email: string, otp: string }
 *
 * Checks the OTP from otpStore (5-min expiry). On success, issues a short-lived
 * verification token (UUID) stored in verifiedTokens (15-min expiry), which
 * the registration endpoint validates instead of re-checking the OTP.
 *
 * On failure (wrong code, expired, not found), returns 400.
 */

import crypto from 'crypto'
import { otpStore, verifiedTokens, TOKEN_EXPIRY_MS } from './store.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, otp } = req.body
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' })
  }

  // Validate: exists, not expired, code matches
  const record = otpStore[email]
  if (!record || Date.now() > record.expiry || record.otp !== otp) {
    return res.status(400).json({ message: 'Invalid or expired OTP' })
  }

  // OTP verified — remove from store (one-time use)
  delete otpStore[email]

  // Issue a UUID verification token with 15-min expiry
  const token = crypto.randomUUID()
  verifiedTokens[token] = { email, expiresAt: Date.now() + TOKEN_EXPIRY_MS }

  return res.json({ message: 'OTP verified', token })
}