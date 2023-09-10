import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validatePassword = (value) => {
    const errors = [
      value.length < 6 && "Password must be at least 6 characters long",
      !/[A-Z]/.test(value) && "Password must contain a capital letter",
      !/[!@#$%^&*]/.test(value) && "Password must contain a special character",
    ].filter(Boolean);

    setPasswordErrors(errors);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-2/5 mx-auto p-4 grid grid-cols-2 gap-2 rounded-md bg-opacity-50 backdrop-blur-md"
    >
      {/* Email */}
      <div className="mb-4 col-span-2">
        <label htmlFor="email" className="block text-black mb-1 font-bold">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input input-bordered input-accent w-full"
        />
        {errors?.email && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Password */}
      <div className="mb-4 col-span-2 w-full">
        <label htmlFor="password" className="block text-black mb-1 font-bold">
          Password
        </label>
        <div className="relative bg-white rounded-lg">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password", { required: true })}
            className="input input-bordered w-full pr-10"
            placeholder="Password"
            onChange={(e) => validatePassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <BsEyeSlashFill className="text-gray-500" />
            ) : (
              <BsEyeFill className="text-gray-500" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
        {passwordErrors.map((error, index) => (
          <span key={index} className="text-red-500">
            {error}
          </span>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mb-4 col-span-2">
        <input type="submit" value="Enter" className="btn btn-primary w-full" />
      </div>
      {/*  */}
    </form>
  );
};

export default LoginForm;
