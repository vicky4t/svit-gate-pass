import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import CamCapture from "./CamCapture";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Sending Data...");

    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("Account Created Successfully");

    reset();

  };

  return (
    <>
      <div className="text-center mt-18 bg-secondary ">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
          Hostel GatePass
          <br />
          Management
          <br />
          System
        </h1>

        <p className="mt-6 text-2xl font-semibold text-slate-700">
          Student Registration
        </p>

        <p className="mt-1 text-base md:text-lg text-slate-500">
          (Only Hostel Students)
        </p>
      </div>

      {/* form start  */}
      <div className=" bg-secondary flex items-center justify-center px-4 py-8 lg:px-8">
        <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-6 lg:max-w-5xl">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center text-blue-600">
              Create Student Account
            </h2>

            <p className="text-center text-gray-500 mt-2 mb-6">
              Only Hostel Students are allowed to register
            </p>

            <div className="lg:flex justify-between">
              {/* Full Name */}
              <div className="lg:w-[48%]">
                <label className="font-semibold text-sm lg:text-lg">Full Name</label>

                <div className="border rounded-lg mt-2 px-3 py-3 bg-secondary ">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full outline-none "
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                  />
                </div>

                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4 lg:w-[48%]">
                <label className="font-semibold text-sm lg:text-lg">Email</label>

                <div className="border rounded-lg mt-2 px-3 py-3 bg-secondary">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full outline-none"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>



            {/* Mobile */}

            <div className="lg:flex justify-between">
            <div className="mb-4 lg:w-[48%]">
              <label className="font-semibold text-sm lg:text-lg">Mobile Number</label>

              <div className="border rounded-lg mt-2 px-3 py-3 bg-secondary">
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full outline-none"
                  {...register("mobile", {
                    required: "Mobile number is required",
                  })}
                />
              </div>

              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Parent Mobile */}
            <div className="mb-4 lg:w-[48%]">
              <label className="font-semibold text-sm lg:text-lg">
                Parent Mobile Number
              </label>

              <div className="border rounded-lg mt-2 px-3 py-3 bg-secondary">
                <input
                  type="tel"
                  placeholder="Enter parent mobile number"
                  className="w-full outline-none"
                  {...register("parentMobile", {
                    required: "Parent mobile number is required",
                  })}
                />
              </div>

              {errors.parentMobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parentMobile.message}
                </p>
              )}
            </div>
            </div>

            {/* Branch */}

            <div className="lg:flex justify-between">
            <div className="mb-4 lg:w-[48%]">
              <label className="font-semibold text-sm lg:text-lg">Branch</label>

              <div className="border rounded-lg mt-2 px-3 py-3 bg-secondary">
                <select
                  className="w-full outline-none bg-transparent"
                  {...register("branch", {
                    required: "Please select your branch",
                  })}
                >
                  <option value="">Select Branch</option>

                  <option value="CSE">CSE</option>
                  <option value="CHEM">CHEM</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="FE">FE</option>
                </select>
              </div>

              {errors.branch && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.branch.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="mb-4 lg:w-[48%]">
              <label className="font-semibold text-sm lg:text-lg">Password</label>

              <div className="border rounded-lg mt-2 px-3 py-3 flex items-center bg-secondary">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Minimum 7 characters required",
                    },
                    maxLength: {
                      value: 15,
                      message: "Maximum 15 Characters Required"
                    }
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            </div>

            {/* Confirm Password */}
            {/* <div className="mb-6">
              <label className="font-semibold text-sm">Confirm Password</label>

              <div className="border rounded-lg mt-2 px-3 py-3 bg-secondary">
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full outline-none"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div> */}

            <div className="max-w-md mx-auto mt-10">
              <CamCapture />
            </div>

            {/* Create Account Button */}

            <div className="lg:flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 mt-10 rounded-lg font-semibold text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } lg:w-xl`}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            </div>

            <hr className="my-6" />

            {/* Login */}
            <div className="flex justify-center items-center gap-1 text-sm">
              <span>Already have an account?</span>

              <Link
                to="/"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
