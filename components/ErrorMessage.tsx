import React from 'react';

interface ErrorMessageProps {
  message: string | null; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-200/20 border-l-4 border-red-500 text-red-300 p-4 my-6 rounded-md shadow-lg" role="alert">
      <div className="flex">
        <div className="py-1">
          {/* Heroicon name: solid/exclamation */}
          <svg className="h-6 w-6 text-red-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.332-.216 3.001-1.742 3.001H4.42c-1.526 0-2.492-1.669-1.742-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1.75-2.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-red-300">Oops! Something went wrong.</p>
          <p className="text-sm text-red-400">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
