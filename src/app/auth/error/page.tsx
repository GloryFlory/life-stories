'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Verification':
        return {
          title: 'Verification Failed',
          message: 'The magic link is invalid or has expired. Magic links can only be used once and expire after 24 hours.',
          action: 'Request a new magic link',
        };
      case 'Configuration':
        return {
          title: 'Configuration Error',
          message: 'There is a problem with the server configuration.',
          action: 'Try again',
        };
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'You do not have permission to sign in.',
          action: 'Go back',
        };
      default:
        return {
          title: 'Authentication Error',
          message: 'An error occurred during authentication.',
          action: 'Try again',
        };
    }
  };

  const { title, message, action } = getErrorMessage(error);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <Link
          href="/"
          className="w-full inline-block bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors"
        >
          {action}
        </Link>

        <p className="text-xs text-gray-500 mt-4">
          If you continue to have problems, please contact support.
        </p>
      </div>
    </main>
  );
}
