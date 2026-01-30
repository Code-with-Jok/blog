import Input from "../Inputs";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import { useSignUp } from "@/hooks/useSignUp";

type SignUpProps = {
  setCurrentPage: (page: "login" | "signup") => void;
};

const SignUp = ({ setCurrentPage }: SignUpProps) => {
  const {
    form,
    errors,
    profilePic,
    setProfilePic,
    handleInputChange,
    SignUpHandler,
  } = useSignUp();

  return (
    <div className="flex items-center md:h-[520px] h-fit">
      <div className="w-[90vw] md:w-[43vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={SignUpHandler}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          {errors.profileImageUrl && (
            <div className="text-red-500 text-xs pb-2.5 mb-2">
              {errors.profileImageUrl}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="fullName"
              value={form.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              error={errors.fullName || null}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email || null}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password || null}
            />

            <Input
              label="Admin Access Token"
              type="number"
              placeholder="6 Digit Code"
              value={form.adminAccessToken}
              onChange={(e) =>
                handleInputChange("adminAccessToken", e.target.value)
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
          src="https://c4.wallpaperflare.com/wallpaper/719/538/514/tengen-toppa-gurren-lagann-kamina-simon-wallpaper-preview.jpg"
          className="md:h-[520px] h-fit w-[33vw] object-cover"
          alt="SignUp"
        />
      </div>
    </div>
  );
};

export default SignUp;
