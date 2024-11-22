"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      <ul className="text-gray-900 flex justify-between items-center p-4 bg-gradient-to-tr from-green-200 via-green-300 to-green-400">
        <li className="flex gap-4 items-center">
          <div>
            <Image src={`/icon.png`} width={50} height={50} alt="Icon" />
          </div>
          <div className="text-3xl font-bold">Gormandize</div>
        </li>
        <li className="font-bold text-3xl flex items-center gap-4">
          {session ? (
            <>
              <Link href="/add-recipes">
                <button
                  type="button"
                  className="text-green-500 hover:text-green-700"
                  aria-label="Add Recipes"
                >
                  <FaPlus size={24} />
                </button>
              </Link>

              <button
                type="button"
                onClick={() => {
                  signOut({ redirect: true, callbackUrl: "/" });
                }}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-pink-500 group-hover:from-red-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Log Out
                </span>
              </button>
            </>
          ) : (
            <Link href="/LogIn">
              <button
                type="button"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Log In
                </span>
              </button>
            </Link>
          )}
        </li>
      </ul>
    </>
  );
};

export default Navbar;
