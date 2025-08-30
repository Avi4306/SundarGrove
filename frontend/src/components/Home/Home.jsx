import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to SundarGrove 🌿</h1>
        <p className="mb-6 text-gray-600">
          A platform to manage mangrove conservation and user activities.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;