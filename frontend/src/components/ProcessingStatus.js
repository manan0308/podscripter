import React from 'react';

function ProcessingStatus() {
  return (
    <div className="text-center p-6">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
      <p className="mt-4 text-gray-600 text-lg font-semibold">Processing your video...</p>
    </div>
  );
}

export default ProcessingStatus;
