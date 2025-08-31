// src/components/Admin/ModerateReports.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports, verifyReport, rejectReport } from '../../actions/admin'; // Assume these actions exist

function ModerateReports() {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleVerify = (reportId) => {
    dispatch(verifyReport(reportId));
  };

  const handleReject = (reportId) => {
    dispatch(rejectReport(reportId));
  };

  if (loading) return <p className="p-4">Loading reports...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Moderate Reports</h2>
      <div className="space-y-4">
        {reports.length === 0 ? (
          <p>No new reports to moderate.</p>
        ) : (
          reports.map((report) => (
            <div key={report._id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold">{report.title}</h3>
              <p className="text-sm text-gray-600">
                Reported by: {report.createdBy?.name || report.createdBy?.email || "Unknown"}
              </p>
              <p className="mt-2 text-gray-800">{report.description}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleVerify(report._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleReject(report._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ModerateReports;