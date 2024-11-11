'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
    }
  }, [status, session, router]);

  const handleSignOut = async () => {
    setIsSigningOut(true); // Set loading to true
    await signOut({ redirect: false, callbackUrl: '/auth/signin' });
    setIsSigningOut(false); // Reset loading state
  };

  if (status === 'loading' || isSigningOut) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-5 -mt-28 items-center justify-center">
        <h1 className="text-3xl">
          {/* {t("Title")}, {session?.user?.name} */}
          Welcome to your Dashboard
        </h1>

        {/* Sign-out button */}
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign out
        </button>
      </div>
    </>
  );
}
