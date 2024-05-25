import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const OTPComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const initializeRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved, allow requestOTP.');
        },
        'expired-callback': () => {
          setError('reCAPTCHA expired, please try again.');
        }
      }, auth);
    }
  };

  const requestOTP = () => {
    setError('');
    setSuccess('');
    initializeRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        setConfirmationResult(result);
        setSuccess('OTP sent successfully!');
      })
      .catch((error) => {
        setError(`Error during signInWithPhoneNumber: ${error.message}`);
        appVerifier.clear();
      });
  };

  const verifyOTP = () => {
    setError('');
    setSuccess('');

    if (confirmationResult) {
      confirmationResult.confirm(otp)
        .then((result) => {
          setSuccess('User signed in successfully!');
        })
        .catch((error) => {
          setError(`Error during confirm OTP: ${error.message}`);
        });
    } else {
      setError('Please request OTP first.');
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <div>
        <label htmlFor="phone-number">Phone Number:</label><br />
        <input
          type="text"
          id="phone-number"
          placeholder="+91 1234567890"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={requestOTP}>Request OTP</button>
      </div>
      <div id="recaptcha-container"></div>
      <div>
        <label htmlFor="otp">OTP:</label><br />
        <input
          type="text"
          id="otp"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={verifyOTP}>Verify OTP</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default OTPComponent;
