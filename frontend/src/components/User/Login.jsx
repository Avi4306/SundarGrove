import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../actions/user";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
console.log(user)
  useEffect(() => {
    if (user) {
      navigate("/reports");
    }
  }, [user, navigate]);

  const onSignIn = (e) => {
    e.preventDefault();
    dispatch(handleLogin(form));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center">
      <div>
        <img src="./src/assets/SG-Logo.png" alt="SundarGrove" className="h-60 " />
      </div>
      <div className="bg-[rgba(255,255,255,0.7)] shadow-md rounded-xl p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome Back, Guardian!</h1>
        <p className="mb-6 text-gray-700">Sign in to access your dashboard and manage mangrove conservation activities.</p>
        <form onSubmit={onSignIn} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className=" rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)] autofill:bg-[rgba(4,132,67,0.56)]"
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[rgba(32,87,50,0.75)] w-40 text-white px-4 py-2 rounded shadow-lg shadow-green-800/40 hover:bg-[rgba(32,87,50,0.75)] transition transform hover:scale-105 active:scale-95 active:shadow-inner border-b-4 border-green-900"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {user && <p className="text-green-600 mt-3 text-center">Welcome {user.name || user.email}</p>}
        <div className="mt-6 text-gray-600">
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