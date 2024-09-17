// ResultDisplay.js
import React, { useState } from 'react';

function ResultDisplay({ result }) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <p className="text-gray-800">{result.summary}</p>
      </div>

      <button
        onClick={() => setShowTranscript(!showTranscript)}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        {showTranscript ? 'Hide Transcript' : 'Show Full Transcript'}
      </button>

      {showTranscript && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Transcript</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{result.transcript}</p>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
