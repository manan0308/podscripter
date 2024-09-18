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
  
  // Dynamically set the backend URL based on environment
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://podscripter-production.up.railway.app/process'  // Replace with your production backend URL
    : 'http://127.0.0.1:8000/process';  // Local development

  try {
    const response = await fetch(backendUrl, {
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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex items-center justify-center p-4">

<div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 opacity-30"></div>
<div className="relative bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 p-12 rounded-lg shadow-2xl max-w-lg w-full border border-[#334155] z-10">

<h1 className="text-4xl font-extrabold mb-8">
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
