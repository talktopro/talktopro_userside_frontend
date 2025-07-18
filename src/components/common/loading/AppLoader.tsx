import React from 'react';

const AppLoader: React.FC = () => {
  return (
    <div className="min-h-screen homepage_keyFeatures_bg flex items-center justify-center p-4">
      <div className="text-center">
        <h3 className="text-4xl not-sm:text-3xl font-bold">
          Talk<span> To</span> <span className="text-purple-500">Pro</span>
        </h3>

        {/* Train Loading Animation */}
        <div className="mt-5 w-70 not-sm:w-56 max-w-full mx-auto">
          <div className="relative bg-gray-200 dark:bg-muted rounded-full h-1.5 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-2/5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-train"></div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-4 animate-pulse">
          Loading your experience...
        </p>
      </div>
    </div>
  );
};

export default AppLoader;