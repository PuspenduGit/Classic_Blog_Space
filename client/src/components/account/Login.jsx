import { useContext, useState } from "react";
import { Box, TextField, Typography, Button, styled } from "@mui/material";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
// console.log(API, "API");

const StyledBox = styled(Box)`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  margin: auto;
  width: 400px;
  // height: 50%;
  // margin: auto;
  // background-color: white;
  // border-radius: 10px;
  box-shadow: 5px 2px 5px 2px rgba(0, 0, 0, 0.5);
`;

const Image = styled("img")({
  width: 170,
  display: "flex",
  margin: "auto",
  padding: "20px 0 0",
  // objectFit: 'cover',
  // borderRadius: '10px',
  // boxShadow: '5px 2px 5px 2px rgba(0,0,0,0.5)',
});

const LoginButton = styled(Button)`
  margin-top: 20px;
  text-transform: none;
  background-color: #3f51b5;
  color: white;
  height: 50px;
  border-radius: 4px;
`;
const SignupButton = styled(Button)`
  margin-top: 20px;
  text-transform: none;
  background-color: white;
  color: #3f51b5;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #3f51b5;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 50%);
`;

const StyledTextField = styled(TextField)`
  margin-top: 20px;
  border-radius: 4px;
`;

const StyledText = styled(Typography)`
  text-align: center;
  font-size: 16px;
`;

const StyledError = styled(Typography)`
  text-align: center;
  font-size: 16px;
  color: red;
`;

const StyledBox2 = styled(Box)`
  display: flex;
  padding: 25px 30px;
  flex: 1;
  flex-direction: column;
  & > div & button,
  & > p {
    // chnaging the child using the parent
    margin-top: 20px;
  }
`;
const defaultSignupData = {
  username: "",
  name: "",
  password: "",
};

const defaultLoginData = {
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const imageURL = "https://i.postimg.cc/QCDsWtqW/webisitelogo.png";

  const [signup, setSignup] = useState(defaultSignupData);
  const [login, setLogin] = useState(defaultLoginData);
  const [accountstate, setAccountState] = useState("login");
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const changeAccountState = () => {
    if (accountstate === "login") {
      setAccountState("signup");
    } else {
      setAccountState("login");
    }
  };

  const onChangeField = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    // console.log(response);
    if (response.isSuccess) {
      setSignup(defaultSignupData);
      changeAccountState();
    } else {
      setError(response.message);
      alert(response.message);
    }
  };

  const onChangeInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setAccount({
        username: response.data.username,
        name: response.data.name,
      });

      isUserAuthenticated(true);

      navigate("/");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <StyledBox>
      <Box>
        <Image src={imageURL} alt="login" />
        {accountstate === "login" ? (
          <StyledBox2>
            <StyledTextField
              onChange={(e) => onChangeInput(e)}
              name="username"
              value={login.username}
              variant="standard"
              label="Enter Your Username"
            />
            <StyledTextField
              name="password"
              value={login.password}
              onChange={(e) => onChangeInput(e)}
              variant="standard"
              label="Enter Your Password"
            />

            {error && <StyledError>{error}</StyledError>}

            <LoginButton onClick={() => loginUser()} variant="contained">
              Login
            </LoginButton>
            <StyledText style={{ textAlign: "center" }}>OR</StyledText>
            <SignupButton onClick={() => changeAccountState()}>
              Create an account
            </SignupButton>
          </StyledBox2>
        ) : (
          <StyledBox2>
            <StyledTextField
              onChange={(e) => onChangeField(e)}
              name="name"
              value={signup.name}
              variant="standard"
              label="Enter Name"
            />
            <StyledTextField
              onChange={(e) => onChangeField(e)}
              name="username"
              value={signup.username}
              variant="standard"
              label="Enter  UserName"
            />
            <StyledTextField
              onChange={(e) => onChangeField(e)}
              name="password"
              value={signup.password}
              variant="standard"
              label="Enter Password"
            />

            {error && <StyledError>{error}</StyledError>}

            <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>

            <StyledText style={{ textAlign: "center" }}>OR</StyledText>
            <LoginButton
              variant="contained"
              onClick={() => changeAccountState()}>
              Already have an account
            </LoginButton>
          </StyledBox2>
        )}
      </Box>
    </StyledBox>
  );
};

export default Login;
