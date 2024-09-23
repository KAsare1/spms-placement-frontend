import { useEffect, useState } from "react";
import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";
import SubmitSuccessModal from "../modals/submitSuccess";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Program {
  id: number;
  program_type: string;
  major: string;
  second_major?: string;
  minor?: string;
  program: string;
}

function Choices() {
  const [openModal, setOpenModal] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [firstChoice, setFirstChoice] = useState<number | null>(null);
  const [secondChoice, setSecondChoice] = useState<number | null>(null);
  const [thirdChoice, setThirdChoice] = useState<number | null>(null);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const storedStudentId = localStorage.getItem("student_id");
  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (storedStudentId) {
      axios
        .get(
          `https://placement-server.onrender.com/auth/student/${storedStudentId}/`
        )
        .then((response) => {
          setStudentId(response.data.id);
          setStudentEmail(response.data.email);
        })
        .catch(() => {
          setErrorMessage("Failed to fetch student details.");
        });
    }
  }, [storedStudentId]);

  useEffect(() => {
    if (!accessToken) {
      // Redirect to login if no access token is found
      navigate("/"); // Ensure navigation without returning JSX
    }
  
    // No return necessary here as we don't need a cleanup function
  }, [accessToken, navigate]);


  axios.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    axios
      .get("https://placement-server.onrender.com/placement/programs/")
      .then((response) => {
        setPrograms(response.data);
        setLoadingPrograms(false);
      })
      .catch(() => {
        setErrorMessage("Failed to fetch programs.");
        setLoadingPrograms(false);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstChoice || !secondChoice || !thirdChoice || !studentId) {
      setErrorMessage(
        "Please select all choices and ensure student details are loaded."
      );
      return;
    }

    if (
      firstChoice === secondChoice ||
      firstChoice === thirdChoice ||
      secondChoice === thirdChoice
    ) {
      setErrorMessage("Please select unique choices for all programs.");
      return;
    }

    const confirmSubmission = window.confirm(
      "Are you sure you want to submit your choices?"
    );
    if (!confirmSubmission) {
      return;
    }

    setSubmitting(true);
    const payload = {
      student: studentId,
      first_choice: firstChoice,
      second_choice: secondChoice,
      third_choice: thirdChoice,
      email: studentEmail,
    };

    try {
      await axios.post(
        "https://placement-server.onrender.com/placement/choices/submit/",
        payload
      );
      setSuccessMessage("Choices submitted successfully!");
      setErrorMessage(null);
      setOpenModal(true);
    } catch (error: any) {
      const message =
        error.response?.data?.error || "You have filled this form already.";
      setErrorMessage(message);
      setSuccessMessage(null);
    } finally {
      setSubmitting(false);
    }
  };

  const isSubmitDisabled =
    submitting ||
    loadingPrograms ||
    !firstChoice ||
    !secondChoice ||
    !thirdChoice ||
    !studentId;

  // Mapping course IDs to course names
  const getProgramName = (programId: number | null) => {
    const program = programs.find((p) => p.id === programId);
    return program ? program.program : "Unknown Program";
  };

  const firstChoiceName = getProgramName(firstChoice);
  const secondChoiceName = getProgramName(secondChoice);
  const thirdChoiceName = getProgramName(thirdChoice);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen"> 
        
        <div className="flex justify-center mt-16 lg:mt-4 lg:ml-4"> 
          <img alt="University of Ghana Logo" src={logo} className="h-16 lg:h-40" /> 
        </div>

        
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-4 lg:p-8 mt-6 lg:mt-0"> 
          <div className="w-full max-w-xl p-4 lg:p-6"> 
            <span className="block text-center text-lg lg:text-2xl font-bold"> 
              Hello Student,
            </span>
            <span className="block text-center text-sm lg:text-base pt-2"> 
              Kindly choose your first, second, and third course choices
            </span>

            <form onSubmit={handleSubmit} className="my-6 lg:my-10 space-y-4 lg:space-y-6"> 
              <div className="mt-2">
                <select
                  id="firstChoice"
                  name="firstChoice"
                  value={firstChoice || ""}
                  disabled={loadingPrograms}
                  onChange={(e) => setFirstChoice(Number(e.target.value))}
                  required
                  className="block w-full rounded-xl border-0 py-2 px-4 lg:py-3 lg:px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled>
                    Choose your first choice
                  </option>
                  {programs.sort((a, b) => a.program.localeCompare(b.program)).map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.program}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  id="secondChoice"
                  name="secondChoice"
                  required
                  value={secondChoice || ""}
                  disabled={loadingPrograms}
                  onChange={(e) => setSecondChoice(Number(e.target.value))}
                  className="block w-full rounded-xl border-0 py-2 px-4 lg:py-3 lg:px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled>
                    Choose your second choice
                  </option>
                  {programs.filter((program) => program.id !== firstChoice).map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.program}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  id="thirdChoice"
                  name="thirdChoice"
                  required
                  value={thirdChoice || ""}
                  disabled={loadingPrograms}
                  onChange={(e) => setThirdChoice(Number(e.target.value))}
                  className="block w-full rounded-xl border-0 py-2 px-4 lg:py-3 lg:px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled>
                    Choose your third choice
                  </option>
                  {programs.filter((program) => program.id !== firstChoice && program.id !== secondChoice).map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.program}
                    </option>
                  ))}
                </select>
              </div>

              {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

              {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="flex w-full justify-center rounded-full bg-[#002D5D] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {submitting ? "Submitting..." : "Confirm Choices"}
                </button>
              </div>
            </form>
          </div>
        </div>

        
        <div className="flex flex-col items-center justify-center mx-5 p-6 w-full lg:w-1/2"> 
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-4 lg:p-8"> 
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800"> 
              Course Combinations: "With" vs. "And"
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-600">Course 1 with Course 2</h3>
              <p className="text-gray-700 mt-2">
                This indicates a <span className="font-semibold">major-minor</span> structure. The first course (Course 1) is the major focus, and the second course (Course 2) is the minor.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600">Course 1 and Course 2</h3>
              <p className="text-gray-700 mt-2">
                This refers to a <span className="font-semibold">combined major</span>, where both subjects are studied more equally, without a major-minor distinction.
              </p>
            </div>
          </div>
        </div>

        
        <div className="hidden lg:block w-1/2"> 
          <img alt="silhouette" src={silhouette} className="h-full object-cover" /> 
        </div>
      </div>


      <SubmitSuccessModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        courses={{
          firstChoice: firstChoiceName,
          secondChoice: secondChoiceName,
          thirdChoice: thirdChoiceName,
        }} 
      />
    </>
  );
}

export default Choices;
