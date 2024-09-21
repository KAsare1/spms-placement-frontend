import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import submitSuccess from "../assets/submitSuccess.svg";

export default function SubmitSuccessModal({
  isOpen,
  setIsOpen,
  courses,
}: {
  isOpen: any;
  setIsOpen: any;
  courses: any;
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:text-left">
                      {/* Modal Illustration */}
                      <div className="flex justify-center">
                        <img
                          src={submitSuccess}
                          alt="submitSuccess illustration"
                          className=""
                        />
                      </div>

                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold text-center text-gray-900"
                      >
                        Submission Successful!
                      </Dialog.Title>
                      <div className="">
                        <span className="text-[14px] text-[#7F7F7F]">
                          You will be notified by email with further information
                          about your placement.
                        </span>
                        <p className=" text-sm text-gray-500">
                          You have selected the following courses:
                        </p>
                        <ul className="text-lg font-medium mt-4 space-y-1">
                          <li>1st Choice: {courses.firstChoice}</li>
                          <li>2nd Choice: {courses.secondChoice}</li>
                          <li>3rd Choice: {courses.thirdChoice}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Close Button */}
                <div className="flex justify-center mb-4">
                  <a href="/">
                    <button
                      type="button"
                      className="font-medium text-lg text-white rounded-full px-10 py-2 bg-[#002D5D] border-2 hover:bg-[#7F7F7F] hover:text-[#D0AA66]"
                    >
                      Close
                    </button>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
