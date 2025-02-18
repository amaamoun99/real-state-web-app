"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AddNewPropertyModal = ({ onClose }) => {
  // Initialize state variables with empty strings or appropriate default values
  const [reference, setReference] = useState("");
  const [title, setTitle] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [mapLocation, setMapLocation] = useState("");
  const [compound, setCompound] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState("");
  const [downpayment, setDownpayment] = useState("");
  const [remaining, setRemaining] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [size, setSize] = useState("");
  const [floors, setFloors] = useState("");
  const [maidsRoom, setMaidsRoom] = useState(false); // Boolean default
  const [acs, setAcs] = useState(false); // Boolean default
  const [furnished, setFurnished] = useState(false); // Boolean default
  const [finishing, setFinishing] = useState("");
  const [unitDescription, setUnitDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null); // File default
  const [additionalPhotos, setAdditionalPhotos] = useState([]); // Files default

  // Handle cover photo file input change
  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  // Handle additional photos file input change
  const handleAdditionalPhotosChange = (e) => {
    setAdditionalPhotos([...e.target.files]); // Store multiple files
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the token from cookies and decode it to get the user ID
    const token = Cookies.get("jwt");
    if (!token) {
      alert("Please log in to add a property");
      return;
    }
    console.log("token", token);

    const decodedToken = jwtDecode(token);
    const ownerId = decodedToken.id; // Assuming your token has an 'id' field
    // Check if user is admin or superadmin
    const isAdminUser = ["admin", "superadmin"].includes(decodedToken.role);

    const formData = new FormData();
    formData.append("Reference", reference);
    formData.append("Title", title);
    formData.append("Bedrooms", bedrooms);
    formData.append("Map_Location", mapLocation);
    formData.append("Compound", compound);
    formData.append("Property_Type", propertyType);
    formData.append("Price", price);
    formData.append("Downpayment", downpayment);
    formData.append("Remaining", remaining);
    formData.append("Purpose", purpose);
    formData.append("Bathrooms", bathrooms);
    formData.append("Size", size);
    formData.append("Floors", floors);
    formData.append("Maids_Room", maidsRoom);
    formData.append("ACs", acs);
    formData.append("Furnished", furnished);
    formData.append("Finishing", finishing);
    formData.append("Unit_Description", unitDescription);
    formData.append("owner", ownerId);
    // Append cover photo if provided
    if (coverPhoto) {
      formData.append("coverPhoto", coverPhoto);
    }

    // Append additional photos if provided
    if (additionalPhotos.length > 0) {
      additionalPhotos.forEach((photo) => {
        formData.append("images", photo); // Use 'images' as the field name for multiple photos
      });
    }

    // Add status field based on user role
    formData.append("Status", isAdminUser ? "approved" : "pending");

    try {
      // First create the property
      const propertyResponse = await axios.post(
        `http://localhost:3001/api/v1/properties`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Add property to user's properties using the entered ownerId
      const propertyId = propertyResponse.data.data.data._id;
      const userResponse = await axios.post(
        `http://localhost:3001/api/v1/users/${ownerId}/properties`,
        { propertyId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Property created:", propertyResponse.data);
      console.log("Property added to user:", userResponse.data);
      onClose();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(
        `Failed to ${
          error.response?.data ? "add property to user" : "create property"
        }. Please try again.`
      );
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 overflow-auto ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-auto h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
          encType="multipart/form-data"
        >
          {/* Reference */}
          <div>
            <label className="block text-gray-700">Reference</label>
            <input
              type="number"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Title */}
          <div className="col-span-2">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-gray-700">Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-gray-700">Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Map Location */}
          <div>
            <label className="block text-gray-700">Map Location</label>
            <input
              type="text"
              value={mapLocation}
              onChange={(e) => setMapLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Compound */}
          <div>
            <label className="block text-gray-700">Compound</label>
            <input
              type="text"
              value={compound}
              onChange={(e) => setCompound(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-gray-700">Property Type</label>
            <input
              type="text"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Downpayment */}
          <div>
            <label className="block text-gray-700">Downpayment</label>
            <input
              type="number"
              value={downpayment}
              onChange={(e) => setDownpayment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Remaining */}
          <div>
            <label className="block text-gray-700">Remaining</label>
            <input
              type="number"
              value={remaining}
              onChange={(e) => setRemaining(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-gray-700">Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-gray-700">Size</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Floors */}
          <div>
            <label className="block text-gray-700">Floors</label>
            <input
              type="text"
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Maid's Room */}
          <div>
            <label className="block text-gray-700">Maid's Room</label>
            <select
              value={maidsRoom.toString()} // Convert boolean to string
              onChange={(e) => setMaidsRoom(e.target.value === "true")}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* ACs */}
          <div>
            <label className="block text-gray-700">ACs</label>
            <select
              value={acs.toString()} // Convert boolean to string
              onChange={(e) => setAcs(e.target.value === "true")}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Furnished */}
          <div>
            <label className="block text-gray-700">Furnished</label>
            <select
              value={furnished.toString()} // Convert boolean to string
              onChange={(e) => setFurnished(e.target.value === "true")}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Finishing */}
          <div>
            <label className="block text-gray-700">Finishing</label>
            <input
              type="text"
              value={finishing}
              onChange={(e) => setFinishing(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Unit Description */}
          <div className="col-span-2">
            <label className="block text-gray-700">Unit Description</label>
            <textarea
              value={unitDescription}
              onChange={(e) => setUnitDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows="4"
            />
          </div>

          {/* Cover Photo */}
          <div className="col-span-2">
            <label className="block text-gray-700">Update Cover Photo</label>
            <input
              type="file"
              onChange={handleCoverPhotoChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Additional Photos */}
          <div className="col-span-2">
            <label className="block text-gray-700">Add Additional Photos</label>
            <input
              type="file"
              multiple // Allow multiple files
              onChange={handleAdditionalPhotosChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPropertyModal;
