import React from 'react';
import appLogo from '@/assets/svg/logo.svg';

const AppLoader: React.FC = () => {
  return (
    <div className="min-h-screen homepage_keyFeatures_bg flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <img
            src={appLogo}
            className='w-15 h-auto'
          />
          <h3 className="text-4xl font-bold flex items-center justify-center gap-1 text-gray-700">
            Talk<span>To</span> <span className="text-purple-500">Pro</span>
          </h3>
        </div>

        {/* Train Loading Animation */}
        <div className="mt-5 w-70 max-w-full mx-auto">
          <div className="relative bg-gray-300 rounded-full h-1.5 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-2/5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-train"></div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-4 animate-pulse">
          Loading your experience...
        </p>
      </div>
    </div>
  );
};

export default AppLoader;