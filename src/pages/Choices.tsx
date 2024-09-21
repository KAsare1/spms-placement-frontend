import { useEffect, useState } from "react";
import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";
import SubmitSuccessModal from "../modals/submitSuccess";
import axios from "axios";

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
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [firstChoice, setFirstChoice] = useState<number | null>(null);
  const [secondChoice, setSecondChoice] = useState<number | null>(null);
  const [thirdChoice, setThirdChoice] = useState<number | null>(null);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const storedStudentId = localStorage.getItem('student_id');

  useEffect(() => {
    if (storedStudentId) {
      axios
        .get(`https://placement-server.onrender.com/auth/student/${storedStudentId}/`)
        .then((response) => {
          setStudentId(response.data.id);
          setStudentEmail(response.data.email);
        })
        .catch(() => {
          setErrorMessage('Failed to fetch student details.');
        });
    }
  }, [storedStudentId]);

  useEffect(() => {
    axios
      .get('https://placement-server.onrender.com/placement/programs/')
      .then((response) => {
        setPrograms(response.data);
        setLoadingPrograms(false);
      })
      .catch(() => {
        setErrorMessage('Failed to fetch programs.');
        setLoadingPrograms(false);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstChoice || !secondChoice || !thirdChoice || !studentId) {
      setErrorMessage('Please select all choices and ensure student details are loaded.');
      return;
    }

    if (firstChoice === secondChoice || firstChoice === thirdChoice || secondChoice === thirdChoice) {
      setErrorMessage('Please select unique choices for all programs.');
      return;
    }

    const confirmSubmission = window.confirm('Are you sure you want to submit your choices?');
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
      await axios.post('https://placement-server.onrender.com/placement/choices/submit/', payload);
      setSuccessMessage('Choices submitted successfully!');
      setErrorMessage(null);
      setOpenModal(true);
    } catch (error: any) {
      const message = error.response?.data?.error || "You have filled this form already.";
      setErrorMessage(message);
      setSuccessMessage(null);
    } finally {
      setSubmitting(false);
    }
  };

  const isSubmitDisabled = submitting || loadingPrograms || !firstChoice || !secondChoice || !thirdChoice || !studentId;

  // Mapping course IDs to course names
  const getProgramName = (programId: number | null) => {
    const program = programs.find((p) => p.id === programId);
    return program ? program.program : 'Unknown Program';
  };

  const firstChoiceName = getProgramName(firstChoice);
  const secondChoiceName = getProgramName(secondChoice);
  const thirdChoiceName = getProgramName(thirdChoice);

  return (
    <>
      <div className="flex h-screen">
        <div className="flex absolute lg:mt-4 lg:ml-4">
          <img alt="University of Ghana Logo" src={logo} className="lg:h-40" />
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-xl p-6">
            <span className="block text-center text-2xl font-bold">
              Hello Student,
            </span>
            <span className="block text-center text-base pt-2">
              Kindly choose your first, second, and third course choices
            </span>

            <form onSubmit={handleSubmit} className="my-10 space-y-6">
              <div className="mt-2">
                <select
                  id="firstChoice"
                  name="firstChoice"
                  value={firstChoice || ''}
                  disabled={loadingPrograms}
                  onChange={(e) => setFirstChoice(Number(e.target.value))}
                  required
                  className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled>
                    Choose your first choice
                  </option>
                  {programs.map((program) => (
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
                  value={secondChoice || ''}
                  disabled={loadingPrograms}
                  onChange={(e) => setSecondChoice(Number(e.target.value))}
                  className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled>
                    Choose your second choice
                  </option>
                  {programs
                    .filter((program) => program.id !== firstChoice)
                    .map((program) => (
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
                  value={thirdChoice || ''}
                  disabled={loadingPrograms}
                  onChange={(e) => setThirdChoice(Number(e.target.value))}
                  className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled>
                    Choose your third choice
                  </option>
                  {programs
                    .filter((program) => program.id !== firstChoice && program.id !== secondChoice)
                    .map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.program}
                      </option>
                    ))}
                </select>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}

              {successMessage && (
                <div className="text-green-500 text-sm">{successMessage}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="flex w-full justify-center rounded-full bg-[#002D5D] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {submitting ? 'Submitting...' : 'Confirm Choices'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-1/2 hidden lg:block">
          <img alt="silhouette" src={silhouette} className="h-full" />
        </div>
      </div>

      <SubmitSuccessModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        courses={{
          firstChoice: firstChoiceName,
          secondChoice: secondChoiceName,
          thirdChoice: thirdChoiceName,
        }} // Passing course names
      />
    </>
  );
}

export default Choices;
