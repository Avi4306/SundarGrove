import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../actions/user";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSignIn = (e) => {
    e.preventDefault();
    dispatch(handleLogin(form));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center px-4 sm:px-6">
      <div className="mt-4 relative sm:mt-6 mb-6 sm:mb-4">
        <img src="./src/assets/SG-Logo.png" alt="SundarGrove" className="h-40 sm:h-48 md:h-60" />
      </div>
      <div className="bg-[rgba(255,255,255,0.7)] relative shadow-md rounded-xl p-4 top-[-40px] w-full max-w-xs sm:max-w-md lg:max-w-lg text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Welcome Back, Guardian!</h1>
        <p className="mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base px-2">
          Sign in to access your dashboard and manage mangrove conservation activities.
        </p>
        <form onSubmit={onSignIn} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-xl px-3 py-2 sm:py-3 bg-[rgba(4,132,67,0.36)] text-sm sm:text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="rounded-xl px-3 py-2 sm:py-3 bg-[rgba(4,132,67,0.36)] autofill:bg-[rgba(4,132,67,0.56)] text-sm sm:text-base"
            required
          />
          <div className="flex justify-center mt-2 sm:mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[rgba(32,87,50,0.75)] w-full sm:w-40 text-white px-4 py-2 sm:py-3 rounded shadow-lg shadow-green-800/40 hover:bg-[rgba(32,87,50,0.55)] transition transform hover:scale-105 active:scale-95 active:shadow-inner border-b-4 border-green-900 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-3 text-center text-sm sm:text-base">{error}</p>}
        {user && <p className="text-green-600 mt-3 text-center text-sm sm:text-base">Welcome {user.name || user.email}</p>}
        <div className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base">
          New to SundarGrove?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;