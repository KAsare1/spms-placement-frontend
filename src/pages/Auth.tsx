import logo from "../assets/University of Ghana logo.svg";
import silhouette from "../assets/great-hall-artwork-BIacy5Lf.webp";

function Auth() {
  return (
    <>
      <div className="flex h-screen">
        {/* Logo */}
        <div className="flex absolute lg:mt-4 lg:ml-4">
          <img alt="University of Ghana Logo" src={logo} className="lg:h-40" />
        </div>
        {/* Left section: Logo and Account verification */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          {/* Input fields for Account verification */}
          <div className="w-full max-w-sm p-6">
            <span className="block text-center text-2xl font-bold">
              Account verification
            </span>
            <span className="mt-2 text-md text-[#8E95A2]">
              We have sent you a confirmation code. Please check your email to
              complete this process.
            </span>

            <form action="#" method="POST" className="space-y-6">
              <div className="mt-4">
                <input
                  id="Confirmation Code"
                  name="Confirmation Code"
                  type="text"
                  required
                  autoComplete="Confirmation Code"
                  className="block w-full rounded-xl border-0 py-3 px-5 text-[#0D0D0E] text-4xl font-bold shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6"
                />
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
      </div>
    </>
  );
}

export default Auth;
