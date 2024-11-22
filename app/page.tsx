"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/recipes")
    }
  }, [session?.status, router])

  return (
    <>
      <div className="overflow-hidden min-h-screen bg-gradient-to-b from-blue-100 via-white to-green-100">
        <div className="flex flex-col md:flex-row items-center justify-center h-screen px-6 md:px-12 lg:px-24">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-snug md:leading-tight">
              Explore Recipes, <br />
              <span className="text-green-500">Create Your Own</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-md">
              Discover new recipes, save your favorites, and share your creations with the world.
            </p>
            <div className="mt-8">
              <Link href="/About">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full px-6 py-3 text-base sm:text-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95"
                >
                  About Us
                </button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="mt-10 md:mt-0 md:ml-12 flex justify-center mb-4 md:mb-0">
              <div className="relative">
                <Image
                  src={`/screen.png`}
                  width={300}
                  height={300}
                  alt="Icon"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-blue-300 blur-xl opacity-50 rounded-lg"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
