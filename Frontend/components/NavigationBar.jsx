"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
  const pathname = usePathname();

  // Don't show navbar on welcome page or auth pages
  if (pathname === '/' || pathname.startsWith('/auth')) {
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
                pathname === '/dashboard' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>

            <Link 
              href="/all-properties"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/all-properties' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Properties
            </Link>

            <Link 
              href="/admin/upload_Properties"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/admin/upload_Properties' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Upload Properties
            </Link>
          </div>

          {/* User Menu/Profile */}
          <div className="flex items-center">
            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => {
                // Add logout functionality here
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