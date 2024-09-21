import axios from "axios";
import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [code, setCode] = useState<string>('');
  const [studentId, setStudentId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Use navigate to redirect to login

  useEffect(() => {
    // Retrieve student_id from localStorage
    const storedStudentId = localStorage.getItem('student_id');
    if (storedStudentId) {
      setStudentId(storedStudentId);
    } else {
      setMessage('No student ID found. Please register first.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentId) {
      setMessage('Student ID not found.');
      return;
    }

    const payload = {
      student_id: studentId,
      code,
    };

    try {
      await axios.post('https://placement-server.onrender.com/auth/confirm/', payload);
      setMessage('Code confirmed! Redirecting to login...');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'Code confirmation failed');
      } else {
        setMessage('Code confirmation failed');
      }
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Logo */}
        <div className="flex absolute lg:mt-4 lg:ml-4">
          <img alt="University of Ghana Logo" src={logo} className="lg:h-40" />
        </div>
        {/* Left section: Logo and Account verification */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          {/* Input fields for Account verification */}
          <div className="w-full max-w-sm p-6">
            <span className="block text-center text-2xl font-bold">
              Account verification
            </span>
            <span className="mt-2 text-md text-[#8E95A2]">
              We have sent you a confirmation code. Please check your email to
              complete this process.
            </span>

            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
              <div className="mt-4">
                <input
                  id="Confirmation Code"
                  name="Confirmation Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  required
                  autoComplete="Confirmation Code"
                  className="block w-full rounded-xl border-0 py-3 px-5 text-[#0D0D0E] text-4xl font-bold shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
              {message && (
                <div className={`mb-4 text-center text-sm ${message.includes('confirmed') ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </div>
              )}
                      <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Confirm Code
        </button>
            </form>
          </div>
        </div>

        {/* Right section: Silhouette Image */}
        <div className="w-1/2 flex items-center justify-center bg-gray-50">
          <img
            alt="Balme Library Silhouette"
            src={silhouette}
            className="h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Auth;
