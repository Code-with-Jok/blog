import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { validateEmail } from "@/utils/helper";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import uploadImage from "@/utils/uploadImage";
import { useUserContext } from "@/context/UserContextDefinition";
import type { SignUpErrors, SignUpForm } from "@/types";

interface UseSignUpReturn {
  form: SignUpForm;
  errors: SignUpErrors;
  profilePic: File | null;
  setProfilePic: (file: File | null) => void;
  setForm: React.Dispatch<React.SetStateAction<SignUpForm>>;
  handleInputChange: (field: string, value: string) => void;
  SignUpHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useSignUp = (): UseSignUpReturn => {
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const [form, setForm] = useState<SignUpForm>({
    fullName: "",
    email: "",
    password: "",
    adminAccessToken: "",
  });

  const [errors, setErrors] = useState<SignUpErrors>({});

  const { updateUser, setOpenAuthForm } = useUserContext();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof SignUpErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const SignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: SignUpErrors = {};

    if (!form.fullName.length) {
      newErrors.fullName = "Full name is required";
    }

    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password.length) {
      newErrors.password = "Password is required";
    }

    if (!profilePic) {
      newErrors.profileImageUrl = "Profile image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imageUploadResponse = await uploadImage(profilePic);
        profileImageUrl = imageUploadResponse.imageUrl || "";
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

  return {
    form,
    errors,
    profilePic,
    setProfilePic,
    setForm,
    handleInputChange,
    SignUpHandler,
  };
};
