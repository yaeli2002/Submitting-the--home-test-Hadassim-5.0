export default function WelcomePage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-screen">
        <h1 className="text-4xl font-bold text-gray-800 text-center">Welcome to Our Supplier Platform</h1>
        <p className="mt-4 text-gray-600 text-center">
          Manage your store, track orders, and connect with customers seamlessly.
        </p>
        <div className="mt-8">
          <a href="/login" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Login
          </a>
          <a
            href="/register"
            className="ml-4 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
          >
            Register
          </a>
        </div>
      </div>
    );
  }