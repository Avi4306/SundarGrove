import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logout } from "../../actions/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const [editMode, setEditMode] = useState(false);
  // Keep only the 'name' field in the edit form state
  const [editForm, setEditForm] = useState({ name: user?.name || "" });

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      {editMode ? (
        <form
          className="mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            /* TODO: dispatch updateProfile */
            setEditMode(false);
          }}
        >
          {/* Only the Name input field is displayed for editing */}
          <div className="mb-2">
            <label className="block text-sm">Name:</label>
            <input
              className="border rounded px-2 py-1 w-full"
              value={editForm.name}
              onChange={(e) => setEditForm({ name: e.target.value })}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded mr-2">
            Save
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
        </>
      )}
      <p>
        <b>Role:</b> {user.role}
      </p>
      <p>
        <b>Points:</b> {user.points}
      </p>
      <p>
        <b>Verified Reports:</b> {user.verifiedReports}
      </p>
      <p>
        <b>Reported Count:</b> {user.reportedCount}
      </p>
      <div className="my-2">
        <b>Badges:</b>
        {user.badges && user.badges.length > 0 ? (
          <ul className="list-disc ml-6">
            {user.badges.map((badge, i) => (
              <li key={i}>
                {badge.name}{" "}
                <span className="text-xs text-gray-500">
                  ({new Date(badge.awardedAt).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <span> None</span>
        )}
      </div>
      <div className="space-x-2 mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setEditMode(true)}>
          Edit Profile
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