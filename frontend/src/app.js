import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  const handleSubmit = async (url) => {
    console.log('handleSubmit called with URL:', url);
    setProcessing(true);
    setError(null);
    try {
      console.log('Attempting to fetch from /process');
      const response = await fetch('http://127.0.0.1:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      console.log('Fetch response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received data:', data);
      setResult(data);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(`An error occurred while processing the video: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="container mx-auto max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          🎥 YouTube Transcriber & Summarizer
        </h1>

        {/* Input Form */}
        <div className="mb-6">
          <InputForm onSubmit={handleSubmit} />
        </div>

        {/* Show Loading Spinner when processing */}
        {processing && (
          <div className="flex justify-center mb-6">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Results</h2>
            <ResultDisplay result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
