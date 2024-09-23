import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/University of Ghana logo.svg";
import back from "../assets/back-arrow.svg";
import rules from "../assets/rules.svg";
import regulations from "../assets/regulations.jpg";

function Rules() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for access token in localStorage
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
  {/* Logo */}
  <div className="flex absolute lg:mt-4 lg:ml-4 mt-8 ml-4">
    <img alt="University of Ghana Logo" src={logo} className="h-16 lg:h-40" /> {/* Adjust logo size for mobile */}
  </div>

  {/* Left section: Logo and Rules svg */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4">
    <img src={rules} alt="Rules and Regulations illustration" className="w-3/4 lg:w-full" /> {/* Responsive width for image */}
    <span className="block text-center text-xl lg:text-2xl font-bold mt-4"> {/* Responsive text size and margin */}
      Rules and Regulations
    </span>
  </div>

  {/* Right section: Rules Section */}
  <div className="w-full lg:w-1/2 flex flex-col bg-gray-50 px-4 lg:px-10 py-4 lg:py-0">
    {/* Back arrow and Accept button div */}
    <div className="flex justify-between items-center w-full lg:px-10 my-5">
      {/* Back Arrow */}
      <div className="flex items-center rounded-md border-2 px-2 bg-[#F7F8F8] hover:bg-slate-500 hover:text-[#D0AA66]">
        <a href="/" className="flex items-center">
          <img src={back} alt="Back Arrow" className="w-8 lg:w-10 text-[#6B7280]" /> {/* Responsive arrow size */}
          <span className="text-sm lg:text-lg font-bold pl-2">Back</span> {/* Responsive text size */}
        </a>
      </div>
      {/* Accept Button */}
      <div>
        <a href="/choices">
          <button
            type="button"
            className="font-bold text-sm lg:text-lg text-white rounded-full px-4 lg:px-6 py-2 bg-[#002D5D] border-2 hover:bg-[#7F7F7F] hover:text-[#D0AA66]"
          >
            Accept
          </button>
        </a>
      </div>
    </div>

    {/* Rules and Regulations text */}
    <span className="text-lg lg:text-3xl text-[#FF0000] text-center font-bold px-4 lg:px-10 my-5"> {/* Responsive text and padding */}
      Please read the following Rules and Regulations carefully before proceeding.
    </span>
    <span className="text-base lg:text-xl px-4 lg:px-10 my-5 lg:my-10">
      By proceeding you agree to be bound by the university rules and regulations for <strong>Passing and Withdrawal</strong> as stated in <strong>Section 9.26.</strong>
    </span>
    <span className="text-sm lg:text-base px-4 lg:px-10 my-5">
      1. A candidate shall be deemed to have satisfied the requirements for progression if he/she has obtained a <strong>CGPA of 1.00 or better overall in all examinations.</strong>
      <br />
      2. In addition to <strong>Section 9.26(a)(ii)</strong> the candidate shall have satisfied School/Departmental requirements for entry to subjects at the next level.
      <br />
      3. There shall be no probation.
      <br />
      4. A candidate who does not qualify to progress to the next level on the basis of <strong>Section 9.26(a)(ii)</strong> and <strong>Section 9.26(a)(iii)</strong> shall be asked by the Registrar to withdraw from the University.
    </span>
    <img alt="Regulations" src={regulations} className="w-full lg:mx-10 my-4 lg:my-0" /> {/* Responsive image */}
  </div>
</div>

    </>
  );
}

export default Rules;
