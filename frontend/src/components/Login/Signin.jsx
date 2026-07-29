import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Signin() {
  const [role, setRole] = useState("student");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Sending Data...");

    console.log({
      role,
      username: data.username,
      password: data.password,
    });

    // API call simulate waiting, block  
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Data Sent Successfully");

    reset();
  };

  return (
    <>

      {/* Main */}
      <div className="bg-secondary min-h-screen flex justify-center py-10 px-4 mt-16">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`w-1/2 py-2 rounded-md font-semibold transition-all duration-300 ${
                  role === "student"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600"
                }`}
              >
                Student
              </button>

              <button
                type="button"
                onClick={() => setRole("faculty")}
                className={`w-1/2 py-2 rounded-md font-semibold transition-all duration-300 ${
                  role === "faculty"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600"
                }`}
              >
                Faculty
              </button>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-center">
              {role === "student" ? "Student Login" : "Faculty Login"}
            </h2>

            <p className="text-center text-gray-500 mt-2 mb-6">
              Enter your credentials to access the portal
            </p>

            {/* Username */}
            <div className="mb-4">
              <label className="font-semibold text-sm">Username</label>

              <div className="border rounded-lg mt-2 px-3 py-3">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full outline-none"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 7,
                      message: "Minimum 7 characters required",
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum 50 characters allowed",
                    },
                  })}
                />
              </div>

              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="font-semibold text-sm">Password</label>

              <div className="border rounded-lg mt-2 px-3 py-3">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Minimum 7 characters required",
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum 50 characters allowed",
                    },
                  })}
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {(role === "faculty") && (
              <div className="mb-6">
              <label className="font-semibold text-sm">Role</label>

              <div className="border rounded-lg mt-2 px-3 py-3">
                 <select
                  className="w-full outline-none bg-transparent"
                  {...register("branch", {
                    required: "Please select your Role",
                  })}
                >
                  <option value="">Select Role</option>

                  <option value="HOD">HOD</option>
                  <option value="Rector">Rector</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <hr className="my-6" />

            {/* Register */}
            {(role === "faculty") && (
              <div className="text-center text-sm">
                <div>Don't have an account? </div>
                <p className="text-blue-600 font-semibold hover:underline">
                  Register Now
                </p>
              </div>
            )}

            {role === "student" && (
              <div className="text-center text-sm">
                <div>Don't have an account? </div>
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Register Now
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
