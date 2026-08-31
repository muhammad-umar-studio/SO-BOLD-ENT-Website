import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_session';
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'SO BOLD ENT_military_grade_zero_trust_secret_2026_x99!'
);

export interface AdminSession {
  userId: string;
  username: string;
  role: 'superadmin' | 'editor';
  createdAt: number;
}

/**
 * Creates a signed JWT session token with 1-hour expiration
 */
export async function createAdminSessionToken(payload: {
  userId: string;
  username: string;
  role: 'superadmin' | 'editor';
}): Promise<string> {
  return await new SignJWT({ ...payload, createdAt: Date.now() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(JWT_SECRET);
}

/**
 * Verifies JWT token signature and expiration
 */
export async function verifyAdminSessionToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

/**
 * Sets hardened httpOnly admin session cookie
 */
export async function setAdminSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 3600, // 1 hour
  });
}

/**
 * Clears the admin session cookie
 */
export async function clearAdminSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

/**
 * Data Access Layer (DAL) helper to verify session at top of Server Actions & Routes
 */
export async function verifyAdminSession(): Promise<AdminSession> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    throw new Error('401: Unauthorized access to admin portal data layer');
  }

  const session = await verifyAdminSessionToken(token);
  if (!session) {
    throw new Error('401: Invalid or expired admin session token');
  }

  return session;
}
