import { useState } from "react";
import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";
import SubmitSuccessModal from "../modals/submitSuccess"; // Import the modal

function Choices() {
  const [openModal, setOpenModal] = useState(false); // State to handle modal visibility
  const [selectedCourses, setSelectedCourses] = useState({
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
  });

  // Sample course options (these can be extended as needed)
  const courses = [
    "Computer Science with Biological Science Programme",
    "Bachelor of Science in Mathematics and Statistics",
    "Electrical Engineering and Renewable Energy Systems",
    "Mechanical Engineering with Robotics",
    "Environmental Science with Climate Change Studies",
    "Artificial Intelligence and Data Science Programme",
    "Physics with Space Science and Technology",
    "Biomedical Engineering with Molecular Biology",
    "Chemistry with Pharmaceutical Studies",
    "Information Technology with Cybersecurity",
  ];

  const handleConfirmChoices = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(true); // Open the modal when choices are confirmed
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourses({
      ...selectedCourses,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Logo */}
        <div className="flex absolute lg:mt-4 lg:ml-4">
          <img alt="University of Ghana Logo" src={logo} className="lg:h-40" />
        </div>
        {/* Centered section */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          {/* Dropdown menus */}
          <div className="w-full max-w-xl p-6">
            <span className="block text-center text-2xl font-bold">
              Hello Student,
            </span>
            <span className="block text-center text-base pt-2">
              Kindly choose your first, second, and third course choices
            </span>

            <form onSubmit={handleConfirmChoices} className="my-10 space-y-6">
              <div className="mt-2">
                <select
                  id="firstChoice"
                  name="firstChoice"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled selected>
                    Choose your first choice
                  </option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  id="secondChoice"
                  name="secondChoice"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled selected>
                    Choose your second choice
                  </option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  id="thirdChoice"
                  name="thirdChoice"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 sm:text-sm"
                >
                  <option value="" disabled selected>
                    Choose your third choice
                  </option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full bg-[#002D5D] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Confirm Choices
                </button>
              </div>
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

        {/* Modal */}
        {openModal && (
          <SubmitSuccessModal
            isOpen={openModal}
            setIsOpen={setOpenModal}
            courses={selectedCourses} // Passing selected courses to the modal
          />
        )}
      </div>
    </>
  );
}

export default Choices;
