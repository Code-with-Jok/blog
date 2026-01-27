import { UserContext } from "@/context/UserContextDefinition";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { validateEmail } from "@/utils/helper";
import { AxiosError } from "axios";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import uploadImage from "@/utils/uploadImage";

type SignUpProps = {
  setCurrentPage: (page: "login" | "signup") => void;
};

const SignUp = ({ setCurrentPage }: SignUpProps) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    adminAccessToken: "",
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    adminAccessToken?: string;
    root?: string;
  }>({});

  const { updateUser, setOpenAuthForm } = useContext(UserContext)!;
  const navigate = useNavigate();

  const SignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!form.fullName.length) {
      newErrors.fullName = "Full name is required";
    }

    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password.length) {
      newErrors.password = "Password is required";
    }

    if (!form.adminAccessToken.length) {
      newErrors.adminAccessToken = "Admin access token is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imageUploadResponse = await uploadImage(profilePic);
        profileImageUrl = imageUploadResponse.url || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: form.fullName,
        email: form.email,
        password: form.password,
        profileImageUrl,
        adminAccessToken: form.adminAccessToken,
      });

      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect to dashboard
        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
        }
        setOpenAuthForm(false);
        navigate("/");
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
    <div className="flex items-center md:h-[520px] h-fit">
      <div className="w-[90vw] md:w-[43vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        {/* form */}
        <form onSubmit={SignUpHandler}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="fullName"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              error={errors.fullName || null}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email || null}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password || null}
            />

            <Input
              label="Admin Access Token"
              type="number"
              placeholder="6 Digit Code"
              value={form.adminAccessToken}
              onChange={(e) =>
                setForm({ ...form, adminAccessToken: e.target.value })
              }
              error={errors.adminAccessToken || null}
            />
          </div>
          {errors.root && (
            <div className="text-red-500 text-xs pb-2.5 mb-2">
              {errors.root}
            </div>
          )}
          <button type="submit" className="btn-primary">
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
      <div className="hidden md:block">
        <img
          src="./images/login.png"
          className="md:h-[520px] h-fit w-[33vw]"
          alt="login"
        />
      </div>
    </div>
  );
};

export default SignUp;
