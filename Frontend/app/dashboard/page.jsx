"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

//import PropertyList from "@/components/PropertyList";
import SearchBar from "@/components/SearchBar";
import FilterSection from "@/components/FilterSection";
import QuickAddProperty from "@/components/QuickAddProperty";
import Table from "@/components/Table";

export default function Dashboard() {
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the response is an array before setting it
        if (Array.isArray(response.data.data.data)) {
          const propertiesData = response.data.data.data;
          setProperties(propertiesData);
          setFilteredProperties(propertiesData); // Initialize filteredProperties with all properties
        } else {
          throw new Error("Response is not an array");
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ... existing code ...

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProperties(properties); // Reset to all properties if search is empty
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = properties.filter((property) => {
      // Convert Reference to string to handle number values
      const reference = String(property.Reference || "").toLowerCase();
      const title = String(property.Title || "").toLowerCase();
      return reference.includes(searchTerm) || title.includes(searchTerm);
    });

    setFilteredProperties(filtered);
  };

  // ... existing code ...

  const handleFilter = (priceRange) => {
    const { minPrice, maxPrice } = priceRange;

    const filtered = properties.filter((property) => {
      const propertyPrice = Number(property.Price) || 0;

      // If no price range is set, include the property
      if (!minPrice && !maxPrice) return true;

      // If only minPrice is set
      if (minPrice && !maxPrice) {
        return propertyPrice >= minPrice;
      }

      // If only maxPrice is set
      if (!minPrice && maxPrice) {
        return propertyPrice <= maxPrice;
      }

      // If both prices are set
      return propertyPrice >= minPrice && propertyPrice <= maxPrice;
    });

    setFilteredProperties(filtered);
  };

  const navigateToBulkUpload = () => {
    router.push("/admin/upload_Properties");
  };

  const handlePropertyAdded = (newProperty) => {
    console.log(newProperty);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Property Dashboard</h1>
        <div className="flex gap-4">
        <QuickAddProperty
            onPropertyAdded={(newProperty) =>
              setProperties(
                properties ? [...properties, newProperty] : [newProperty]
              )
            }
          />
          <button
            onClick={navigateToBulkUpload}
            className="relative inline-flex items-center px-4 py-2 overflow-hidden text-base font-bold text-white bg-gradient-to-r from-green-600 to-green-400 rounded-lg shadow-lg hover:from-green-500 hover:to-green-300 transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-green-300"
          >
            <span className="mr-2">
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </span>
            Bulk Upload
          </button>
         
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <SearchBar onSearch={handleSearch} />
          <FilterSection onFilter={handleFilter} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              Loading properties...
            </div>
          ) : (
            <Table properties={filteredProperties} />
          )}
        </div>
      </div>
    </div>
  );
}
