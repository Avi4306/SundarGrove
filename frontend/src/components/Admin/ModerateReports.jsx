// src/components/Admin/ModerateReports.js
import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaFileAlt } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-green-200 flex flex-col items-center justify-center px-2 sm:px-8 py-10">
      <div className="w-full max-w-4xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl sm:text-4xl font-black mb-8 text-green-800 drop-shadow text-center flex items-center justify-center gap-2">
          <FaFileAlt className="text-green-600 text-3xl sm:text-4xl" /> Moderate Reports
        </h2>
        <div className="space-y-6">
          {reports.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No new reports to moderate.</p>
          ) : (
            reports.map((report) => (
              <div key={report._id} className="p-6 bg-green-50 border border-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-green-800 mb-1 flex items-center gap-2">
                  <FaFileAlt className="text-green-600" /> {report.title}
                </h3>
                <p className="text-sm text-blue-700 mb-2">Reported by: <span className="font-semibold">{report.createdBy?.name}</span></p>
                <p className="mb-2 text-gray-800">{report.description}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleVerify(report._id)}
                    className="bg-green-500 text-white px-5 py-2 rounded-xl shadow hover:bg-green-600 transition flex items-center gap-2 font-bold"
                  >
                    <FaCheckCircle className="text-white" /> Verify
                  </button>
                  <button
                    onClick={() => handleReject(report._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-xl shadow hover:bg-red-600 transition flex items-center gap-2 font-bold"
                  >
                    <FaTimesCircle className="text-white" /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ModerateReports;