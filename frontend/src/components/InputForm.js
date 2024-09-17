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
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className={`w-full md:flex-1 p-3 border ${isValid ? 'border-gray-300' : 'border-red-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          required
        />
        <button
          type="submit"
          className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
        >
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
