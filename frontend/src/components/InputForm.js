// InputForm.js
import React, { useState } from 'react';

function InputForm({ onSubmit }) {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUrl(url)) {
      onSubmit(url);
      setUrl('');
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col md:flex-row items-center">
        <input
          type="text"
          value={url}
          placeholder="Enter YouTube URL"
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 border border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="inline-block w-full py-3 ml-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white font-semibold rounded-full shadow-lg hover:from-purple-400 hover:to-pink-300 transition duration-300 ease-in-out"        >
          Process Video
        </button>
      </div>
      {!isValid && (
        <p className="text-red-500 text-sm mt-2">Please enter a valid YouTube URL.</p>
      )}
    </form>
  );
}

export default InputForm;
