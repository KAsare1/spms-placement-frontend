import { useState } from "react";
import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // New success message state
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    setErrorMessage(null); // Clear previous error message
    setSuccessMessage(null); // Clear previous success message
  
    const payload = {
      student_id: studentId,
      password: password,
    };
  
    try {
      const response = await axios.post(
        "https://placement-server.onrender.com/auth/login/",
        payload
      );
  
      // Assuming the response contains a token after a successful login
      const access_token = response.data?.access;  // Adjust to your response
      const refresh_token = response.data?.refresh;
  
      // Store token in local storage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("student_id", studentId);
  
      // Set success message
      setSuccessMessage("Login successful! Redirecting...");
  
      // Redirect to the rules page after a short delay
      setTimeout(() => {
        navigate("/rules");
      }, 2000); // Delay for 2 seconds to show the success message
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If the API returns an error response, check the status code
        if (error.response) {
          const status = error.response.status;
          const errorData = error.response.data;
  
          // Handle specific status codes
          if (status === 400) {
            setErrorMessage("Invalid request. Please check your input.");
          } else if (status === 401) {
            setErrorMessage("Invalid credentials. Please check your student ID and password.");
          } else if (status === 404) {
            setErrorMessage("User not found. Please check your student ID.");
          } else if (status === 500) {
            setErrorMessage("Server error. Please try again later.");
          } else {
            // General fallback for other status codes
            setErrorMessage(
              errorData?.message || "Login failed. Please try again."
            );
          }
        } else if (error.request) {
          // Network error (request made but no response received)
          setErrorMessage("Network error. Please check your connection.");
        } else {
          // Unknown error
          setErrorMessage("An unknown error occurred. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading once the request completes
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
  {/* Logo */}
  <div className="flex absolute lg:mt-4 lg:ml-4">
    <img alt="University of Ghana Logo" src={logo} className="h-16 lg:h-40" /> {/* Adjust logo size */}
  </div>

  {/* Left section: Logo and Login Form */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-8">
    {/* Input fields for login */}
    <div className="w-full max-w-lg p-6">
      <span className="block text-center text-xl lg:text-2xl font-bold mb-6">
        Welcome to the <br /> SPMS Level 200 Programme Selection - 24/25 Academic Year
      </span>

      <form
        action="#"
        method="POST"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="mt-2">
          <input
            id="Student/Staff ID"
            name="Student/Staff ID"
            type="text"
            onChange={(e) => setStudentId(e.target.value)}
            value={studentId}
            required
            autoComplete="Student/Staff ID"
            placeholder="Student/Staff ID"
            className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="password"
              placeholder="Password"
              className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {loading && (
          <div className="text-blue-500 text-center text-sm">
            Processing...
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-green-500 text-center text-sm">
            {successMessage}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-full bg-[#002D5D] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 flex justify-end">
        You don’t have an account?{" "}
        <a
          href="/"
          className="pl-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Register Here
        </a>
      </p>
    </div>
  </div>

  {/* Right section: Silhouette Image */}
  <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
    <img
      alt="Balme Library Silhouette"
      src={silhouette}
      className="h-64 lg:h-full object-cover"
    />
  </div>
</div>

    </>
  );
}

export default Login;
