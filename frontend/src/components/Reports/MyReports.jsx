import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../../actions/report";

function MyReports() {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.reports);

  useEffect(() => {
    fetchReports(dispatch);
  }, [dispatch]);

  const myReports = reports

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!myReports.length) return <p>No reports submitted yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Reports</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {myReports.map((report) => (
          <div
            key={report._id}
            className="border rounded-lg shadow p-4 bg-white"
          >
            <h3 className="text-lg font-semibold">{report.title}</h3>
            <p className="text-gray-600">{report.description}</p>
            {report.imageUrl && (
              <img
                src={report.imageUrl}
                alt={report.title}
                className="w-full h-40 object-cover rounded mt-2"
              />
            )}
            <p className="text-sm text-gray-500 mt-2">
              Status:{" "}
              <span
                className={
                  report.status === "verified"
                    ? "text-green-600"
                    : report.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {report.status}
              </span>
            </p>
            <p className="text-xs text-gray-400">
              Created: {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReports;