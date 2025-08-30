import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopUsers } from "../../actions/leaderboard";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.topUsers);

  useEffect(() => {
    dispatch(fetchTopUsers());
  }, [dispatch]);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Top 5 Users</h2>
      <ol className="list-decimal pl-6">
        {users.map((user, index) => (
          <li key={user._id} className="mb-2">
            <div className="flex justify-between">
              <span>{user.name}</span>
              <span>{user.points} pts</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;