'use server';

import { z } from 'zod';
import {
  createAdminSessionToken,
  setAdminSessionCookie,
  clearAdminSessionCookie,
} from '@/lib/auth';

// Simple in-memory rate limiter store for brute-force protection
const loginAttemptsMap = new Map<string, { count: number; resetAt: number }>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes window

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = loginAttemptsMap.get(identifier);

  if (!entry) {
    return false;
  }

  if (now > entry.resetAt) {
    loginAttemptsMap.delete(identifier);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

function recordAttempt(identifier: string) {
  const now = Date.now();
  const entry = loginAttemptsMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    loginAttemptsMap.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
  } else {
    entry.count += 1;
  }
}

// Zod Schema for incoming login validation
const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password too long'),
});

export interface LoginResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function loginAdminAction(
  _prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const usernameInput = formData.get('username') as string;
  const passwordInput = formData.get('password') as string;

  // 1. Zod Schema Validation
  const validation = loginSchema.safeParse({
    username: usernameInput,
    password: passwordInput,
  });

  if (!validation.success) {
    const formattedErrors: Record<string, string> = {};
    validation.error.issues.forEach((err) => {
      if (err.path[0]) {
        formattedErrors[err.path[0].toString()] = err.message;
      }
    });
    return {
      success: false,
      message: 'Validation failed. Please verify form inputs.',
      errors: formattedErrors,
    };
  }

  const { username, password } = validation.data;

  // 2. Rate Limiting Check
  if (isRateLimited(username.toLowerCase())) {
    return {
      success: false,
      message: 'Too many failed attempts. Account temporarily locked for 15 minutes.',
    };
  }

  // 3. Credentials Check against Environment or Secure Defaults
  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'sobold2026!';

  if (username !== expectedUsername || password !== expectedPassword) {
    recordAttempt(username.toLowerCase());
    return {
      success: false,
      message: 'Invalid security credentials. Access denied.',
    };
  }

  // 4. Generate & Store Hardened Session
  const token = await createAdminSessionToken({
    userId: 'admin-001',
    username: expectedUsername,
    role: 'superadmin',
  });

  await setAdminSessionCookie(token);

  return {
    success: true,
    message: 'Authentication granted. Redirecting to control center...',
  };
}

export async function logoutAdminAction() {
  await clearAdminSessionCookie();
}
