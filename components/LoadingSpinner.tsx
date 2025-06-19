import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8" aria-live="polite" aria-busy="true">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-lg text-slate-200">Weaving your story...</p>
    </div>
  );
};

export default LoadingSpinner;
