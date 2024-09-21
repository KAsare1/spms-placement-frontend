import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";

function Login() {
  return (
    <>
      <div className="flex h-screen">
        {/* Logo */}
        <div className="flex absolute lg:mt-4 lg:ml-4">
          <img alt="University of Ghana Logo" src={logo} className="lg:h-40" />
        </div>
        {/* Left section: Logo and Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          {/* Input fields for login */}
          <div className="w-full max-w-lg p-6">
            <span className="block text-center text-2xl font-bold mb-6">
              Welcome to the SPMS <br /> Placement System
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

              <div>
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
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full bg-[#002D5D] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 flex justify-end">
              You don’t have an account?{" "}
              <a
                href="/register"
                className="pl-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register Here
              </a>
            </p>
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
      </div>
    </>
  );
}

export default Login;
