import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logout } from "../../../actions/user";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  if (!user) return <p className="p-4">Please login</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Points: {user.points}</p>

      <div className="space-x-2 mt-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
          onClick={() => dispatch(fetchProfile())}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}

export default Profile;