import React from "react";
import { FaPlus } from "react-icons/fa";
import LoginForm from "../../component/auth/LoginForm";

const Login = () => {
  return (
    <>
      <div className="min-h-screen justify-center items-center flex">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 w-[90%] md:w-[90%] xl:w-[60%] lg:w-[70%] mx-auto">
          <div className="flex gap-3 flex-col">
            <img
              src="https://www.cdnlogo.com/logos/f/10/facebook.svg"
              alt="fb Logo"
              width={200}
            />
            <h2 className="text-3xl text-gray-700">Recent Logins</h2>
            <p className="text-gray-500">
              Click your picture or add an account.
            </p>
          </div>
          <div className="flex">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
