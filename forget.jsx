import React, { useState } from 'react';

// This is a simple array of dummy users. In a real application,
// this would be replaced with a call to your backend database.
const dummyUsers = [
  { email: 'user1@example.com', name: 'Alice' },
  { email: 'user2@example.com', name: 'Bob' },
  { email: 'user3@example.com', name: 'Charlie' }
];

// In a real application, this OTP would be generated on the server and sent to the user's email.
const DUMMY_OTP = '123456';

const App = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State to manage the current step of the password reset process.
  const [currentView, setCurrentView] = useState('email');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handles the email submission.
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    const user = dummyUsers.find(user => user.email === email);
    if (user) {
      setUserName(user.name);
      // Change the view to the OTP verification screen.
      setCurrentView('otp');
    } else {
      setMessage('Email not found. Please try again.');
    }
  };

  // Handles the OTP verification submission.
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (otp === DUMMY_OTP) {
      // If OTP is correct, move to the password reset page.
      setCurrentView('resetPassword');
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  // Handles the new password submission.
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    // In a real app, you would send the new password to your server here.
    // For this example, we'll just show a success message.
    setCurrentView('success');
  };

  // A simple component to render the final success message.
  const SuccessPage = () => (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
      <p className="mt-2 text-sm text-gray-500">
        Your password has been successfully reset.
      </p>
      <button 
        onClick={() => setCurrentView('email')}
        className="mt-6 py-2 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        Return to login
      </button>
    </div>
  );

  // A simple component to render the password reset form.
  const PasswordResetForm = () => {
    const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

    return (
      <>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
          <p className="mt-2 text-sm text-gray-500">
            Welcome, {userName}. Please enter your new password.
          </p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="relative space-y-2">
            <label htmlFor="new-password" className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="new-password"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 pr-10"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              style={{ top: '1.75rem' }}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0112 5.25c4.78 0 8.877 2.454 10.42 5.923-.62.825-1.5 1.5-2.52 2.05-.59.324-1.22.58-1.88.777M9.25 10.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 10.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.823a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.575-3.01-9.963-7.823z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </span>
          </div>
          <div className="relative space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 pr-10"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              style={{ top: '1.75rem' }}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0112 5.25c4.78 0 8.877 2.454 10.42 5.923-.62.825-1.5 1.5-2.52 2.05-.59.324-1.22.58-1.88.777M9.25 10.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 10.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.823a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.575-3.01-9.963-7.823z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </span>
          </div>
          {/* We now use a single div to prevent layout shift */}
          <div className="min-h-[2rem]"> 
            {newPassword.length > 0 && confirmPassword.length > 0 && (
              <p className={`text-sm text-center ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                {passwordsMatch ? 'Passwords match! 😊' : 'Passwords do not match. 🙁'}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Change Password
          </button>
        </form>
      </>
    );
  };

  // Main component rendering logic using a switch statement for clarity.
  const renderView = () => {
    switch (currentView) {
      case 'email':
        return (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter your email to reset your password.
              </p>
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email-address" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Reset Password
              </button>
            </form>
          </>
        );
      case 'otp':
        return (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">OTP Verification</h2>
              <p className="mt-2 text-sm text-gray-500">
                Please enter the OTP sent to your email.
              </p>
            </div>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp-code" className="text-sm font-medium text-gray-700">
                  OTP Code
                </label>
                <input
                  id="otp-code"
                  name="otp"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('email')}
                className="w-full py-2 px-4 rounded-lg font-semibold text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Back
              </button>
            </form>
          </>
        );
      case 'resetPassword':
        return <PasswordResetForm />;
      case 'success':
        return <SuccessPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg space-y-6">
        {renderView()}

        {/* Message area for displaying success or error messages. */}
        {message && (
          <div className={`mt-4 text-center text-sm font-medium p-3 rounded-lg ${
            message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
