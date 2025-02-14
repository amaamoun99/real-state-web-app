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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is an array before setting it
        if (Array.isArray(response.data.data.data)) {
          setProperties(response.data.data.data); // Correctly set the properties
        } else {
          throw new Error('Response is not an array');
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false); // Ensure loading state is managed here
      }
    };

    fetchProperties();
  }, []); // Dependency array ensures this runs only once

  const handleSearch = (query) => {
    console.log(query);
  };

  const handleFilter = (priceRange) => {
    console.log(priceRange);
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
        <button
          onClick={navigateToBulkUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Bulk Upload
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <SearchBar onSearch={handleSearch} />
          <FilterSection onFilter={handleFilter} />
          <QuickAddProperty
            onPropertyAdded={(newProperty) =>
              setProperties(
                properties ? [...properties, newProperty] : [newProperty]
              )
            }
          />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              Loading properties...
            </div>
          ) : (
            <Table properties={properties} />
          )}
        </div>
      </div>
    </div>
  );
}
