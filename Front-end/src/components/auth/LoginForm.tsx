import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Divider } from "./Divider";
import { SocialLogin } from "./SocialLogin.tsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputField } from "../ui/InputField.tsx";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
      console.log("Parsed Data:", data);
  
      // Check if the response status is successful AND if the data contains UserID
      if (response.ok && data && data.UserID) {
        Cookies.set('userId', data.UserID, { path: '/', secure: true, sameSite: 'strict' });
        localStorage.setItem('userId', data.UserID);
        localStorage.setItem("user", JSON.stringify(data));
        alert("Login successful!");
        navigate("/");
      } else {
        // If the response is not ok OR UserID is missing, treat it as a login failure
        console.error("Login failed:", data ? data.error : "Login failed");
        alert(`Login failed: ${data ? data.error || "Invalid credentials" : "Invalid credentials"}`);
        setFormData((prev) => ({ ...prev, password: "" }));
      }
    }  catch (error) {
      console.error("Error during login:", error);
      let errorMessage = "Login failed due to an unexpected error.";
      if (error instanceof Error) {
        errorMessage = `Login failed: ${error.message}`;
      } else if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
        errorMessage = `Login failed: ${error.message}`;
      }
      alert(errorMessage);
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  };


  const { handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Form submitted:", data);
    handleLogin(); // Call your login function here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {" "}
      {/* Use handleSubmit from react-hook-form */}
      <div className="w-full font-normal">
        <h1 className="text-black text-[40px]">Login</h1>
        <p className="text-[#121] text-base opacity-75 mt-4">
          Login to access your Travelokè account
        </p>
      </div>
      <div className="w-full mt-12">
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          pattern="^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
          maxLength={50}
          placeholder="Enter your email"
          required
        />
        <div className="mt-6">
          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
            placeholder="Enter your password"
            icon={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
            required
            minLength={8}
            maxLength={30}
            pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
          />
        </div>

        <div className="flex items-center justify-between text-sm font-medium mt-6">
          <div className="flex items-center gap-2 text-[#121]">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <button type="button" className="text-[#FF8682]">
            Forgot Password
          </button>
        </div>

        <div className="flex w-full flex-col items-stretch text-sm mt-10">
          <Button
            type="submit"
            className="w-full bg-[#8DB1D3] hover:bg-[#7a9ebf] text-white font-semibold py-6"
          >
            Login
          </Button>

          <p className="text-[#112211] text-center font-medium mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-semibold text-[#FF8682] hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="mt-10">
          <Divider text="Or login with" />
        </div>

        <div className="mt-10">
          <SocialLogin
            icons={[
              "https://cdn.builder.io/api/v1/image/assets/TEMP/73c5d9b7f8e29d0f044644c6b6261f6ab881ec29?placeholderIfAbsent=true",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/74899ea30cfb27d8438f5598ed43b8dc16575bc4?placeholderIfAbsent=true",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/e1b03f5895357a75f6203a74d90d979541aca059?placeholderIfAbsent=true",
            ]}
          />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;