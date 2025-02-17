"use client";

import { useState } from "react";
import UserManagement from "@/components/superadmin/UserManagement";
import PropertyManagement from "@/components/superadmin/PropertyManagement";
import UserPropertyManagement from "@/components/superadmin/UserPropertyManagement";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Super Administrator Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "properties"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("properties")}
        >
          Property Management
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "userProperties"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("userProperties")}
        >
          User Property Management
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === "users" ? (
          <UserManagement />
        ) : activeTab === "properties" ? (
          <PropertyManagement />
        ) : (
          <UserPropertyManagement />
        )}
      </div>
    </div>
  );
}
