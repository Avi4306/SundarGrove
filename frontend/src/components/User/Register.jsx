import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../actions/user";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success && user) {
      navigate("/reports");
    }
  }, [success, user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Combine first and last name into a single 'name' field
    const fullName = `${form.firstName} ${form.lastName}`;
    const registrationData = {
      name: fullName,
      email: form.email,
      password: form.password,
    };
    dispatch(handleRegister(registrationData));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('./src/assets/SG-1.jpg')] bg-cover bg-center ">
      <div>
        <img src="./src/assets/SG-Logo.png" alt="SundarGrove" className="h-60" />
      </div>
      <div className="bg-[rgba(255,255,255,0.7)] shadow-md rounded-xl p-6 w-full max-w-md text-center pb-8">
        <h2 className="text-3xl font-bold mb-4">Register</h2>
        <p className="mb-6 text-gray-700">
          Join SundarGrove and become a Guardian! Fill in your details below:
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)]"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
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
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="rounded-xl px-3 py-2 bg-[rgba(4,132,67,0.36)]"
            required
          />
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
        <div className="mt-6 text-gray-600">
          Already a user?{" "}
          <Link to="/" className="text-green-600 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;