import { useState } from "react";
import { useAuth } from "../../hooks";
import { useUserAuth } from "../../context";
import {
  AuthForm,
  AuthInput,
  AuthWrapper,
  Button,
  Error,
  Heading,
  Label,
  Logo,
  PasswordWrapper,
  Subtext,
} from "./auth";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function SignUpPage() {
  const [signUpError, setSignUpError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { signUpUser } = useAuth();
  const { setLoading } = useUserAuth();
  const { email, username, password, confirmPassword } = formData;
  const isPasswordMatched = confirmPassword === password;
  const isDisabled = username === "" || email === "" || confirmPassword === "";
  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{7,32}$/.test(
    password
  );

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
    setSignUpError("");
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setSignUpError("");
    setLoading(true);
  
    if (!isPasswordValid) {
      setSignUpError("Please enter a valid password!");
      setLoading(false);
      return;
    }
  
    if (!isPasswordMatched) {
      setSignUpError("Both passwords must match!");
      setLoading(false);
      return;
    }
  
    try {
      const {
        data: { success, message },
      } = await signUpUser(formData);
  
      if (!success) {
        if (message === "Username or email already exists.") {
          setSignUpError(message);
        } else {
          console.log(message);
          setSignUpError("Failed to create an account.");
        }
      }
    } catch (error) {
      setSignUpError("Failed to create an account.");
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <AuthWrapper>
      <AuthForm onSubmit={signUpHandler}>
        <Logo>ShareSpace</Logo>
        <Heading>SignUp</Heading>
        <Label required={true}>Username</Label>
        <AuthInput
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        <Label required={true}>Email</Label>
        <AuthInput
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <Label required={true}>Password</Label>
        <PasswordWrapper >
        <AuthInput
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        {/* <div> */}
          {showPassword ? (
            <VisibilityOffOutlinedIcon
              size={20}
              onClick={togglePasswordVisibility}
            />
          ) : (
            <RemoveRedEyeOutlinedIcon
              onClick={togglePasswordVisibility}
            />
          )}
        {/* </div> */}
        </PasswordWrapper>
        <Label required={true}>Confirm Password</Label>
        <AuthInput
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          onChange={handleChange}
        />

        <Error>{signUpError}</Error>
        <Button type="submit" disabled={isDisabled}>
          Create New Account
        </Button>
        <Subtext>
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>Login</span>
        </Subtext>
      </AuthForm>
    </AuthWrapper>
  );
}
