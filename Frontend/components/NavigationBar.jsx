"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const NavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    // Check if user is superadmin on component mount
    const token = Cookies.get("jwt");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsSuperAdmin(decodedToken.role === "superadmin");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Don't show navbar on welcome page or auth pages
  if (pathname === "/" || pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              EGY Bro
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/dashboard"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/all-properties"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/all-properties"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Properties
            </Link>

            <Link
              href="/admin/upload_Properties"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/admin/upload_Properties"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Upload Properties
            </Link>

            
              <Link
                href="/superadmin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith("/superadmin")
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Super Admin
              </Link>
            
          </div>

          {/* User Menu/Profile */}
          <div className="flex items-center">
            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white"
              onClick={() => {
                Cookies.remove('jwt');
                router.push('/auth/login');
                router.refresh();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
