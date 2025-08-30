import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../actions/user";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success && user) {
      navigate("/");
    }
  }, [success, user, navigate]);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, password: value });
    if (!passwordRegex.test(value)) {
      setPasswordError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
    } else {
      setPasswordError("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!passwordRegex.test(form.password)) {
      setPasswordError(
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character."
      );
      return;
    }
    dispatch(handleRegister(form));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center px-4 sm:px-6">
      <div className="mt-4 relative sm:mt-6 mb-6 sm:mb-4">
        <img src="./src/assets/SG-Logo.png" alt="SundarGrove" className="h-40 sm:h-48 md:h-60" />
      </div>
      <div className="bg-[rgba(255,255,255,0.7)] relative shadow-md rounded-xl p-4 top-[-40px] w-full max-w-xs sm:max-w-md lg:max-w-lg text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Join SundarGrove!</h1>
        <p className="mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base px-2">
          Register to become a Guardian and help protect mangrove ecosystems.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl px-3 py-2 sm:py-3 bg-[rgba(4,132,67,0.36)] text-sm sm:text-base"
            required
          />
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
            onChange={handlePasswordChange}
            className="rounded-xl px-3 py-2 sm:py-3 bg-[rgba(4,132,67,0.36)] text-sm sm:text-base"
            required
          />
          {passwordError && (
            <p className="text-red-500 text-xs sm:text-sm text-left px-2">{passwordError}</p>
          )}
          <div className="flex justify-center mt-2 sm:mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[rgba(32,87,50,0.75)] w-full sm:w-40 text-white px-4 py-2 sm:py-3 rounded shadow-lg shadow-green-800/40 hover:bg-[rgba(32,87,50,0.55)] transition transform hover:scale-105 active:scale-95 active:shadow-inner border-b-4 border-green-900 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-3 text-center text-sm sm:text-base">{error}</p>}
        {user && <p className="text-green-600 mt-3 text-center text-sm sm:text-base">Welcome {user.name || user.email}</p>}
        <div className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base">
          Already a user?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;