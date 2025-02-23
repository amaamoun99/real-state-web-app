import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center space-y-8 p-8">
        {/* Hero Section */}
        <h1 className="text-5xl font-bold text-gray-800">
          EGY Bro Real Estate
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your smart property and user management system for real estate
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            icon="💡"
            title="Smart Technology"
            description="Efficient property and user management system"
          />
          <FeatureCard
            icon="🔍"
            title="Advanced Search"
            description="Find properties by reference number, name, or price"
          />
          <FeatureCard
            icon="📊"
            title="Bulk Upload"
            description="Efficiently manage properties via Excel uploads"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center mt-12">
          <Link
            href="/auth/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}


function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
