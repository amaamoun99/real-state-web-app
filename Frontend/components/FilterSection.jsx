"use client";

import { useState } from "react";

export default function FilterSection({ onFilter }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    const priceRange = `${minPrice}-${maxPrice}`;
    onFilter(priceRange);
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
        <button
          onClick={handleFilter}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
