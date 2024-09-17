// App.js
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import ProcessingStatus from './components/ProcessingStatus';

function App() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (url) => {
    setProcessing(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(`An error occurred while processing the video: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-8">
          🎥 YouTube Transcriber & Summarizer
        </h1>

        <InputForm onSubmit={handleSubmit} />

        {processing && <ProcessingStatus />}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
}

export default App;
