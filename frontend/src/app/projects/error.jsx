"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-6">
          We couldn't load the project details. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}