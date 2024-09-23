import axios from "axios";
import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [studentId, setStudentId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New loading state

  const role = "STUDENT"; // Hardcoded role
  const navigate = useNavigate(); // Use navigate for routing

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage("Passwords do not match.");
      return;
    }

    const payload = {
      student_id: studentId,
      email,
      password,
      password_confirm: passwordConfirm, // Include password_confirm in the payload
      role,
    };

    try {
      setLoading(true); // Start loading
      await axios.post(
        "https://placement-server.onrender.com/auth/register/",
        payload
      );
      setMessage("Registration successful!");
      setLoading(false); // Stop loading

      // Store the student_id in localStorage
      localStorage.setItem("student_id", studentId);
      localStorage.setItem("email", email);

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      setLoading(false); // Stop loading in case of an error
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "This account already exists");
      } else {
        setMessage("Registration failed, try again later");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen"> 
  <div className="flex justify-center lg:mt-4 lg:ml-4 mt-8"> 
    <img alt="University of Ghana Logo" src={logo} className="h-20 lg:h-40" /> 
  </div>
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-8"> 
    <div className="w-full max-w-lg p-4 lg:p-6"> 
      <span className="block text-center text-xl lg:text-2xl font-bold mb-6"> 
        Register for the SPMS Level 200 Programme Selection - 24/25 Academic Year
      </span>

      <form
        action="#"
        method="POST"
        className="space-y-4 lg:space-y-6"  
        onSubmit={handleSubmit}
      >
        <div className="mt-2">
          <input
            id="Student/Staff ID"
            name="Student/Staff ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            type="text"
            required
            autoComplete="Student/Staff ID"
            placeholder="Student/Staff ID"
            className="block w-full rounded-xl border-0 py-2 lg:py-3 px-4 lg:px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 sm:text-sm"
          />
        </div>

        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="Email"
            className="block w-full rounded-xl border-0 py-2 lg:py-3 px-4 lg:px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 sm:text-sm"
          />
        </div>

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
            className="block w-full rounded-xl border-0 py-2 lg:py-3 px-4 lg:px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 sm:text-sm"
          />
        </div>

        <div className="mt-2">
          <input
            id="confirm-password"
            name="confirm-password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
            required
            autoComplete="confirm-password"
            placeholder="Confirm Password"
            className="block w-full rounded-xl border-0 py-2 lg:py-3 px-4 lg:px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 sm:text-sm"
          />
        </div>
        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.includes("successful")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center rounded-full px-3 py-2 lg:py-3 text-sm lg:text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              loading ? "bg-gray-500" : "bg-[#002D5D] hover:bg-indigo-500"
            }`}
          >
            {loading ? "Registering..." : "Register"} {/* Show loading text */}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a
          href="/login"
          className="pl-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login Here
        </a>
      </p>
    </div>
  </div>

  <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 mt-8 lg:mt-0"> 
    <img
      alt="Balme Library Silhouette"
      src={silhouette}
      className="h-48 lg:h-full object-cover"
    />
  </div>
</div>

  );
}

export default Register;
