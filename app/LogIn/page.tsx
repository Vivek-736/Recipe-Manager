"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Page = () => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/recipes")
    }
  }, [session?.status, router])

  const socialAction = (action: string) => {
    setLoading(true);

    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error("Something went wrong!")
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully")
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 flex flex-col items-center justify-center relative">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 shadow-md transition-transform transform hover:scale-105"
        >
          Back
        </button>

        <h1 className="text-center text-blue-700 text-6xl font-extrabold drop-shadow-lg mb-28">
          Welcome! Get Ready to Explore
        </h1>

        <div className="flex items-center justify-center">
          <button onClick={() => socialAction("google")} disabled={loading}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#3367D6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg py-3 px-6 inline-flex items-center shadow-lg transition-transform transform hover:scale-105 active:scale-95"
          >
            <svg
              className="w-5 h-5 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
