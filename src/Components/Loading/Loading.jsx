// components/Loading.jsx
import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const Loading = ({ size = 'md', fullScreen = false, message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className={`${spinnerSize} border-4 border-blue-400/30 border-t-blue-500 rounded-full animate-spin`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-white font-medium">{message}</p>
          <p className="mt-2 text-sm text-blue-300 animate-pulse">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className={`${spinnerSize} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      {message && (
        <p className="mt-3 text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

// Skeleton Loading Component
export const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  const skeletons = {
    card: (
      <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          <div className="mt-4">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    ),
    list: (
      <div className="flex items-center space-x-3 animate-pulse">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    ),
    text: (
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    ),
    table: (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-300 rounded mb-2"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded mb-1"></div>
        ))}
      </div>
    )
  };

  const skeletonType = skeletons[type] || skeletons.card;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <React.Fragment key={i}>{skeletonType}</React.Fragment>
      ))}
    </div>
  );
};

// Button Loading State
export const ButtonLoader = ({ text = 'Loading...' }) => {
  return (
    <span className="flex items-center justify-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      {text}
    </span>
  );
};

// Page Transition Loader
export const PageTransitionLoader = () => {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;