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
  if (!myReports.length) return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center p-8 rounded-2xl shadow-md" style={{ backgroundColor: '#c5eba8' }}>
      <h2 className="text-2xl font-bold text-green-700 mb-2">No Reports Yet</h2>
      <p className="text-gray-600 text-center mb-4">You haven't submitted any reports.<br />Start contributing to mangrove conservation!</p>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-8" style={{ backgroundColor: '#c5eba8' }}>
      <h2 className="text-3xl font-bold mb-8 text-center text-green-700 drop-shadow">My Reports</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myReports.map((report) => (
          <div
            key={report._id}
            className="border rounded-2xl shadow-lg p-5 bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-800">{report.title}</h3>
            <p className="text-gray-700 mb-2">{report.description}</p>
            {report.imageUrl && (
              <img
                src={report.imageUrl}
                alt={report.title}
                className="w-full h-40 object-cover rounded-lg mb-2 border"
              />
            )}
            <div className="flex items-center justify-between mt-2">
              <span
                className={
                  "px-3 py-1 rounded-full text-xs font-bold " +
                  (report.status === "verified"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : report.status === "rejected"
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-300")
                }
              >
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(report.createdAt).toLocaleDateString()}<br />
                {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReports;