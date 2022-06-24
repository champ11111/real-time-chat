import React from "react";

const login = () => {
  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <div className="flex justify-end">
            {/* <input class="mr-2 leading-tight" type="checkbox" />
            <span class="text-sm">Remember Me</span> */}
            <a href="../forgot-password/">Forgot Password?</a>
          </div>
          <button
            type="submit"
            class="w-full text-center py-3 rounded bg-green text-white hover:bg-gray-700 bg-black focus:outline-none my-1"
          >
            Login
          </button>
        </div>
        <div class="text-grey-dark mt-6">
          Don't have an account yet?<span> </span>
          <a
            class="no-underline border-b border-blue-500 text-blue-500"
            href="../register/"
          >
            Sign up
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default login;
