import Input from "../Inputs";
import { useLogin } from "@/hooks/useLogin";

type LoginProps = {
  setCurrentPage: (page: "login" | "signup") => void;
};

const Login = ({ setCurrentPage }: LoginProps) => {
  const { form, errors, handleInputChange, loginHandler } = useLogin();

  return (
    <div className="flex items-center">
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-0.5 mb-6">
          Please login to your account
        </p>

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
        <img
          src="https://wallpapers.com/images/hd/tengen-toppa-gurren-lagann-simon-qo1ada0ql4b9htsr.jpg"
          className="h-[400px] w-[33vw] object-cover"
          alt="login"
        />
      </div>
    </div>
  );
};

export default Login;
