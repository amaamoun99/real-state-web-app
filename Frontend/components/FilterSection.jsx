"use client";

import { useState } from "react";

export default function FilterSection({ onFilter }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    // Convert string values to numbers or null if empty
    const priceRange = {
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null
    };
    onFilter(priceRange);
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    onFilter({ minPrice: null, maxPrice: null });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4">Filter by Price</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Min price"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Max price"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Apply Filter
          </button>
          <button
            onClick={handleClear}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}