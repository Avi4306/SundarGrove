import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../actions/user";
import { Link, useNavigate } from "react-router-dom";
import FloatingNavBar from "../Home/FloatingNavBar";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success && user) {
      navigate("/reports");
    }
  }, [success, user, navigate]);

  // Password regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  // Validate pre-filled password on mount or when form.password changes
  useEffect(() => {
    if (form.password && !passwordRegex.test(form.password)) {
      setPasswordError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
    } else {
      setPasswordError("");
    }
    // eslint-disable-next-line
  }, [form.password]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, password: value });
    setPasswordError("");
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        if (!passwordRegex.test(value)) {
          setPasswordError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
        } else {
          setPasswordError("");
        }
      }, 700)
    );
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
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 to-blue-100">
      <div className="min-h-screen w-full flex flex-col items-center bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center pb-20 ">
        <img src="./src/assets/SG-Logo.png" alt="SundarGrove" className="h-60 " />
        <div className="bg-[rgba(255,255,255,0.7)] shadow-md rounded-xl p-6 w-full max-w-md text-center ">
          <h2 className="text-3xl font-bold mb-4">Register</h2>
          <p className="mb-6 text-gray-700">Join SundarGrove and become a Guardian! Fill in your details below:</p>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)]"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handlePasswordChange}
              className="rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)] border-red-400 focus:border-red-600"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm text-left px-2">{passwordError}</p>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-[rgba(32,87,50,0.75)] w-40 text-white px-4 py-2 rounded shadow-lg shadow-green-800/40 hover:bg-[rgba(32,87,50,0.55)] transition transform hover:scale-105 active:scale-95 active:shadow-inner border-b-4 border-green-900"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
          {user && <p className="text-green-600 mt-3 text-center">Welcome {user.name || user.email}</p>}
          <div className="mt-6 text-gray-600 ">
            Already a user?{' '}
            <Link to="/" className="text-green-600 font-semibold hover:underline mt-0 mb-6">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;