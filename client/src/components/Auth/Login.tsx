import { useContext, useState } from "react";
import { AxiosError } from "axios";
import Input from "../Inputs";
import { validateEmail } from "@/utils/helper";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/context/UserContextDefinition";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setCurrentPage: (page: "login" | "signup") => void;
};

const Login = ({ setCurrentPage }: LoginProps) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    root?: string;
  }>({});

  const { updateUser, setOpenAuthForm } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password.length) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: form.email,
        password: form.password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect to dashboard
        if (response.data.role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
        } else {
          setOpenAuthForm(false);
          navigate("/");
        }
      }
      setErrors({});
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        setErrors({ root: error.response.data.message });
      } else {
        setErrors({ root: "Something went wrong. Please try again." });
      }
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-0.5 mb-6">
          Please login to your account
        </p>

        {/* form */}
        <form onSubmit={loginHandler}>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email || null}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password || null}
          />

          {errors.root && (
            <div className="text-red-500 text-xs pb-2.5 mb-2">
              {errors.root}
            </div>
          )}

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>

      <div className="hidden md:block">
        <img src="./images/login.png" className="h-[400px]" alt="login" />
      </div>
    </div>
  );
};

export default Login;
