import { useState, type HTMLInputTypeAttribute } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type InputProps = {
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  onKeyDown,
  onFocus,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <label className="text-[13px] text-slate-800 font-medium" htmlFor={label}>
        {label}
      </label>

      <div className="input-box">
        <input
          id={label}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          className="w-full bg-transparent outline-none"
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
    </div>
  );
};

export default Input;
