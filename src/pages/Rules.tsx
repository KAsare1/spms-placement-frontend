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
      <div className="flex h-screen">
        {/* Logo */}
        <div className="flex absolute lg:mt-4 lg:ml-4">
          <img alt="University of Ghana Logo" src={logo} className="lg:h-40" />
        </div>

        {/* Left section: Logo and Rules svg */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          <img src={rules} alt="Rules and Regulations illustration" />
          <span className="block text-center text-2xl font-bold">
            Rules and Regulations
          </span>
        </div>

        {/* Right section: Rules Section */}
        <div className="w-1/2 flex flex-col bg-gray-50">
          {/* Back arrow and Accept button div */}
          <div className="flex justify-between items-center w-full px-10 my-5">
            {/* Back Arrow */}
            <div className="flex items-center rounded-md border-2 px-2 bg-[#F7F8F8] hover:bg-slate-500 hover:text-[#D0AA66]">
              <a href="/" className="flex items-center">
                <img
                  src={back}
                  alt="Back Arrow"
                  className="w-10 text-[#6B7280]"
                />
                <span className="text-lg font-bold pl-2">Back</span>
              </a>
            </div>
            {/* Accept Button */}
            <div>
              <a href="/choices">
                <button
                  type="button"
                  className="font-bold text-lg text-white rounded-full px-6 py-2 bg-[#002D5D] border-2 hover:bg-[#7F7F7F] hover:text-[#D0AA66]"
                >
                  Accept
                </button>
              </a>
            </div>
          </div>

          {/* Rules and Regulations text */}
          <span className="text-3xl text-[#FF0000] text-center font-bold px-10 my-5">
            Please read the following Rules and Regulations carefully before
            proceeding.
          </span>
          <span className="text-xl px-10 my-10">
            By proceeding you agree to be bound by the university rules and
            regulations for <strong>Passing and Withdrawal</strong> as stated in
            <strong> Section 9.26.</strong>
          </span>
          <span className="text-base px-10 my-5">
            1. A candidate shall be deemed to have satisfied the requirements
            for progression if he/she has obtained a{" "}
            <strong>CGPA of 1.00 or better overall in all examinations.</strong>
            <br />
            2. In addition to <strong>Section 9.26(a)(ii)</strong> the candidate
            shall have satisfied School/Departmental requirements for entry to
            subjects at the next level.
            <br />
            3. There shall be no probation.
            <br />
            4. A candidate who does not qualify to progress to the next level on
            the basis of <strong>Section 9.26(a)(ii)</strong> and{" "}
            <strong>Section 9.26(a)(iii)</strong> shall be asked by the
            Registrar to withdraw from the University,
          </span>
          <img alt="Regulations" src={regulations} className="mx-10" />
        </div>
      </div>
    </>
  );
}

export default Rules;
