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
      await axios.post(
        "https://placement-server.onrender.com/auth/register/",
        payload
      );
      setMessage(
        "Registration successful!"
      );

      // Store the student_id in localStorage
      localStorage.setItem("student_id", studentId);
      localStorage.setItem("email", email);

      // Redirect to the code login page
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Registration failed");
      } else {
        setMessage("Registration failed");
      }
    }
  };
  return (
    <div className="flex h-screen">
      <div className="flex absolute lg:mt-4 lg:ml-4">
        <img alt="University of Ghana Logo" src={logo} className="lg:h-40" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-lg p-6">
          <span className="block text-center text-2xl font-bold mb-6">
            Register for the SPMS Level 200 Programme Selection - 24/25 Academic Year
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
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                type="text"
                required
                autoComplete="Student/Staff ID"
                placeholder="Student/Staff ID"
                className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
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
                className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
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
                className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
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
                className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
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
                className="flex w-full justify-center rounded-full bg-[#002D5D] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 flex justify-end">
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

      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <img
          alt="Balme Library Silhouette"
          src={silhouette}
          className="h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Register;
