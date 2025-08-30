import React, { useState } from 'react';

function SmsButton({ recipientNumber, messageBody }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSendSms = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const apiUrl = 'http://localhost:3001/send-sms';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientNumber,
          body: messageBody,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'An unknown error occurred.');
      }

      setSuccess(`SMS sent successfully! SID: ${result.sid}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sms-sender">
      <button onClick={handleSendSms} disabled={loading}>
        {loading ? 'Sending...' : 'Send Notification'}
      </button>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SmsButton;


// import SmsButton from '../sms.jsx'; // Adjust the import path as needed

// const managerNumber = '+919471174553'; // Replace with the recipient number
// const dailyReport = 'System status: OK. All tasks completed.';

    //   <SmsButton 
    //       recipientNumber={managerNumber} 
    //       messageBody={dailyReport} 
    //     />