'use client'; // Required for using hooks in Next.js

import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const UploadExcel = () => {
  const [file, setFile] = useState(null); // State to store the selected file
  const [message, setMessage] = useState(''); // State to display success/error messages
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setIsLoading(true); // Start loading
    setMessage('');

    try {
      // Read the Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON

        // Send the data to the backend
        sendDataToBackend(rows);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading file:', error);
      setMessage('Failed to read file: ' + error.message);
      setIsLoading(false);
    }
  };

  // Send data to the backend
  const sendDataToBackend = async (rows) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/upload`, { rows });
      setMessage(`Upload successful: ${response.data.processed} processed, ${response.data.skipped} skipped`);
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      setMessage('Upload failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Excel File</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Input */}
        <div>
          <label className="block text-gray-700 mb-2">Select Excel File</label>
          <input
            type="file"
            accept=".xlsx, .xls" // Allow only Excel files
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading} // Disable button while loading
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {/* Display Success/Error Message */}
      {message && (
        <div className={`mt-4 p-4 rounded ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadExcel;