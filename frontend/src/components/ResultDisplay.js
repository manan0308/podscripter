import React from 'react';

function ResultDisplay({ result }) {
  return (
    <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Transcript</h3>
        <p className="bg-gray-100 p-4 rounded-lg text-gray-800">{result.transcript}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Summary</h3>
        <p className="bg-gray-100 p-4 rounded-lg text-gray-800">{result.summary}</p>
      </div>
    </div>
  );
}

export default ResultDisplay;
