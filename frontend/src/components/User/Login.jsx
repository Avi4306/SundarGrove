import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../../actions/user";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(form));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white w-full py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {user && <p className="text-green-600 mt-3 text-center">Welcome {user.name || user.email}</p>}
      </div>
    </div>
  );
}

export default Login;