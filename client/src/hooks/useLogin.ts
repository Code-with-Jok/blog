import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "@/utils/helper";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { useUserContext } from "@/context/UserContextDefinition";

interface UseLoginReturn {
  form: { email: string; password: string };
  errors: { email?: string; password?: string; root?: string };
  handleInputChange: (field: string, value: string) => void;
  loginHandler: (e: React.FormEvent) => Promise<void>;
}

interface UseLoginProps {
  setCurrentPage?: (page: "login" | "signup") => void; // Optional if not used inside hook
  onSuccess?: () => void;
}

export const useLogin = ({ onSuccess }: UseLoginProps = {}): UseLoginReturn => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    root?: string;
  }>({});

  const { updateUser, setOpenAuthForm } = useUserContext();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof typeof errors]) {
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

        if (onSuccess) onSuccess();
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

  return { form, errors, handleInputChange, loginHandler };
};
