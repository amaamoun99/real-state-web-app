// app/property/[id]/page.js
import Image from 'next/image';
import axios from 'axios';
import PropertyDetails from '../../../components/PropertyDetails'; // Client Component

// This function runs on the server side, fetching property data based on the dynamic id
export default async function PropertyPage({ params }) {
  const { id } = await params; // Extract the dynamic ID from the URL

  let property = null;
  // Fetch property data based on the ID
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${id}`);
    property = response.data.data.data; // Extract property correctly from response
  } catch (error) {
    console.error('Error fetching property:', error);
    return <p className="text-red-600 text-center mt-4">Property not found</p>; // Fallback if no property found
  }

  if (!property) {
    return <p className="text-red-600 text-center mt-4">Property not found</p>; // Fallback if no property found
  }

  // Render the property details component and pass the property data
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-8">
      <PropertyDetails property={property} />
    </div>
  );
}