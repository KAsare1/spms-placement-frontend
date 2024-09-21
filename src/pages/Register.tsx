import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";

function Register() {
  return (
    <div className="flex h-screen">
      <div className="flex absolute lg:mt-4 lg:ml-4">
        <img alt="University of Ghana Logo" src={logo} className="lg:h-40" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-lg p-6">
          <span className="block text-center text-2xl font-bold mb-6">
            Register for the SPMS Placement System
          </span>

          <form action="#" method="POST" className="space-y-6">
            <div className="mt-2">
              <input
                id="Student/Staff ID"
                name="Student/Staff ID"
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
                type="password"
                required
                autoComplete="confirm-password"
                placeholder="Confirm Password"
                className="block w-full rounded-xl border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E95A2] focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>

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
              href="/"
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
