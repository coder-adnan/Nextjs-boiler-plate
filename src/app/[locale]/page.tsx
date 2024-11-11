import Link from 'next/link';
// import ErrorBoundary from "../../pages/_error";
export default function Home() {
  return (
    // <ErrorBoundary>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-8 text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Welcome to Next.js Custom Boilerplate!
      </h1>
      <p className="text-xl text-center mb-4">
        Explore modern web development with Next.js and React.
      </p>
      <Link href="/auth/signin">
        <span className="mt-6 py-3 px-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
          Sign In
        </span>
      </Link>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-300">
          New to the site?{' '}
          <Link href="/auth/signup">
            <span className="text-white hover:underline">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
    //{" "}
    // </ErrorBoundary>
  );
}
