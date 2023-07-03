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
  Subtext,
} from "./auth";
import { useNavigate } from "react-router-dom";
import { guestLogInDetails } from "../../utils/utils";
export default function SignInPage() {
  const [signInError, setSignInError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { logInUser } = useAuth();
  const { setLoading } = useUserAuth();
  const { email, password } = formData;
  const isDisabled = email === "" || password === "";

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSignInError("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    setSignInError("");
    setLoading(true);
    try {
      const {
        data: { success, message },
      } = await logInUser(formData);
      if (!success) {
        setSignInError(message);
      }
    } catch (error) {
      setSignInError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <AuthForm onSubmit={signInHandler}>
        <Logo>ShareSpace</Logo>
        <Heading>Log In</Heading>
        <Label required={true}>Email</Label>
        <AuthInput
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <Label required={true}>Password</Label>
        <AuthInput
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <Error>{signInError}</Error>
        <Button type="submit" disabled={isDisabled}>
          Sign In
        </Button>
        <Button
          guest={"true"}
          type="submit"
          onClick={() =>
            setFormData({
              email: guestLogInDetails.email,
              password: guestLogInDetails.password,
            })
          }
        >
          Guest Mode
        </Button>
        <Subtext>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>{" "}
        </Subtext>
      </AuthForm>
    </AuthWrapper>
  );
}
