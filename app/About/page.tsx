/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-10">
      <div className="absolute top-6 right-6">
        <Link href="/" className="text-lg font-semibold text-blue-600 hover:text-blue-800">
          &#8592; Back to Home
        </Link>
      </div>

      <div className="text-center space-y-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
          About This Application
        </h1>
        <p className="text-lg lg:text-xl text-gray-600">
          Built with love, sarcasm, and a dash of caffeine ☕. Here's the team behind this masterpiece:
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg space-y-4 transform transition-transform hover:scale-105">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-3xl font-bold">
            V
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Vivek</h3>
          <p className="text-gray-600">
            The visionary behind this app, Vivek brings passion, creativity, and questionable design decisions to the table.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg space-y-4 transform transition-transform hover:scale-105">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-3xl font-bold">
            P
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Pieces</h3>
          <p className="text-gray-600">
            The curious sidekick who helps piece everything together (no pun intended). They may or may not be a wizard.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg space-y-4 transform transition-transform hover:scale-105">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white flex items-center justify-center text-3xl font-bold">
            G
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">GitHub Copilot</h3>
          <p className="text-gray-600">
            The real genius behind the code. GitHub Copilot somehow always knows what you want, even when you don't.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg space-y-4 transform transition-transform hover:scale-105">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white flex items-center justify-center text-3xl font-bold">
            C
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Me (Your Assistant)</h3>
          <p className="text-gray-600">
            I'm the one who makes it all happen! Without me, this page would be as empty as your caffeine cup at 3 PM.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          What's Next? 👀
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We're just getting started! Stay tuned for more exciting features, bug fixes, and accidental misclicks.
        </p>
      </div>
    </div>
  );
}