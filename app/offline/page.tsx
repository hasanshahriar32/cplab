import { Metadata } from 'next'
import RefreshButton from '@/components/refresh-button'

export const metadata: Metadata = {
  title: 'Offline - Cyber Physical Lab',
  description: 'You are currently offline. Please check your internet connection.',
}

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          You're offline
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please check your internet connection and try again.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                What you can do:
              </h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                <li>• Check your internet connection</li>
                <li>• Try refreshing the page</li>
                <li>• Some cached content may still be available</li>
              </ul>
            </div>
            
            <RefreshButton />
          </div>
        </div>
      </div>
    </div>
  )
}
