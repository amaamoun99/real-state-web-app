'use client'; // Required for using hooks in Next.js

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const UploadExcel = () => {
  const [file, setFile] = useState(null); // State to store the selected file
  const [message, setMessage] = useState(''); // State to display success/error messages
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.includes('sheet') || droppedFile?.name.match(/\.(xlsx|xls)$/)) {
      setFile(droppedFile);
    } else {
      setMessage('Please upload only Excel files (.xlsx or .xls)');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Upload Excel File</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8
            flex flex-col items-center justify-center
            min-h-[200px] cursor-pointer
            transition-all duration-200
            ${isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
        >
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Upload Icon */}
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* Upload Text */}
          <p className="text-lg text-gray-600 text-center">
            {file 
              ? `Selected: ${file.name}`
              : 'Drop your Excel file here, or browse'
            }
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supports: .xlsx, .xls
          </p>
        </div>

        {/* Upload Button */}
        {file && (
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 px-4 rounded-lg
              text-white font-medium
              transition-all duration-200
              ${isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
              }
            `}
          >
            {isLoading ? 'Uploading...' : 'Upload Excel File'}
          </button>
        )}

        {/* Message Display */}
        {message && (
          <div className={`
            p-4 rounded-lg text-center
            ${message.includes('Failed') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
            }
          `}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadExcel;