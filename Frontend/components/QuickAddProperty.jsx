"use client";

import { useState } from "react";
import AddNewPropertyModal from "./AddNewPropertyModal";

export default function QuickAddProperty({onPropertyAdded}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Quick Add Property
      </button>
      {isModalOpen && <AddNewPropertyModal onClose={handleCloseModal} />}
    </div>
  );
}
