"use client";

import React, { useState } from "react";
import axios from "axios";

const EditPropertyModal = ({ property, onClose }) => {
  // State variables for all property fields with empty string fallbacks

  const [reference, setReference] = useState(property.Reference || "");
  const [title, setTitle] = useState(property.Title || "");
  const [bedrooms, setBedrooms] = useState(property.Bedrooms || "");
  const [mapLocation, setMapLocation] = useState(property.Map_Location || "");
  const [compound, setCompound] = useState(property.Compound || "");
  const [propertyType, setPropertyType] = useState(
    property.Property_Type || ""
  );
  const [price, setPrice] = useState(property.Price || "");
  const [downpayment, setDownpayment] = useState(property.Downpayment || "");
  const [remaining, setRemaining] = useState(property.Remaining || "");
  const [purpose, setPurpose] = useState(property.Purpose || "");
  const [bathrooms, setBathrooms] = useState(property.Bathrooms || "");
  const [size, setSize] = useState(property.Size || "");
  const [floors, setFloors] = useState(property.Floors || "");
  const [maidsRoom, setMaidsRoom] = useState(property.Maids_Room || false);
  const [acs, setAcs] = useState(property.ACs || false);
  const [furnished, setFurnished] = useState(property.Furnished || false);
  const [finishing, setFinishing] = useState(property.Finishing || "");
  const [unitDescription, setUnitDescription] = useState(
    property.Unit_Description || ""
  );
  const [coverPhoto, setCoverPhoto] = useState(null); // For updating the cover photo
  const [additionalPhotos, setAdditionalPhotos] = useState([]); // For adding multiple photos

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

    // If there are files to upload, use FormData
    if (coverPhoto || additionalPhotos.length > 0) {
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

      if (coverPhoto) {
        formData.append("coverPhoto", coverPhoto);
      }

      if (additionalPhotos.length > 0) {
        additionalPhotos.forEach((photo) => {
          formData.append("images", photo);
        });
      }

      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${property._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Property updated:", response.data);
        onClose();
      } catch (error) {
        console.error("Error updating the property:", error);
      }
    } else {
      // If no files to upload, send regular JSON
      const updateData = {
        Reference: reference,
        Title: title,
        Bedrooms: bedrooms,
        Map_Location: mapLocation,
        Compound: compound,
        Property_Type: propertyType,
        Price: price,
        Downpayment: downpayment,
        Remaining: remaining,
        Purpose: purpose,
        Bathrooms: bathrooms,
        Size: size,
        Floors: floors,
        Maids_Room: maidsRoom,
        ACs: acs,
        Furnished: furnished,
        Finishing: finishing,
        Unit_Description: unitDescription,
      };

      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${property._id}`,
          updateData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Property updated:", response.data);
        onClose();
      } catch (error) {
        console.error("Error updating the property:", error);
      }
    }
  };

  if (!property) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 overflow-auto ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-auto h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
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
              value={maidsRoom}
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
              value={acs}
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
              value={furnished}
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

export default EditPropertyModal;
