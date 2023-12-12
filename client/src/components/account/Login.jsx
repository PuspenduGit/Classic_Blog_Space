import { useContext, useEffect, useState } from "react";
import { Box, TextField, Typography, Button, styled } from "@mui/material";

// import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate, useLocation } from "react-router-dom";
// console.log(API, "API");

// dotenv.config();

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

  const location = useLocation();

  const [signup, setSignup] = useState(defaultSignupData);
  const [login, setLogin] = useState(defaultLoginData);
  const [accountstate, setAccountState] = useState("login");
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    // console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwtDecode(response.credential);

    // console.log(decoded);

    const googleSignupData = {
      username: decoded.email,
      name: decoded.name,
      password: decoded.sub,
    };

    const googleLoginData = {
      username: decoded.email,
      password: decoded.sub,
    };

    const googleSignup = async () => {
      try {
        response = await API.userSignup(googleSignupData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const googleLogin = async () => {
      var response;
      try {
        response = await API.userLogin(googleLoginData);
      } catch (error) {
        error.then((res) => {
          if (res.code === 400) {
            googleSignup();
            googleLogin();
            navigate("/");
          } else if (res.code === 444) {
            navigate("/error");
          }
        });
      }

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
        alert("Invalid Credentials");
      }
    };

    if (accountstate === "login") {
      googleLogin();
    } else {
      googleSignup();
    }

    // document.getElementById("g_id_onload").style.display = "none";
  };

  useEffect(() => {
    /* global google */
    // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    google.accounts.id.initialize({
      // client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_id:
        "645417395837-1thdm6ed2lkrtvr0di88jh4dho54fttk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("g_id_onload"), {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "rectangular",

      height: 50,
      width: 340,
    });

    // if (location.pathname === "/account") google.accounts.id.prompt();
  });

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

  const loginUser = async (login) => {
    if (!login.username || !login.password) {
      setError("Please enter username and password");
      return;
    } else {
      setError("");
    }
    var response;
    try {
      response = await API.userLogin(login);
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
        alert("Invalid Credentials");
      }
    } catch (error) {
      error.then((res) => {
        if (res.code === 400) {
          setError("Invalid Credentials");
          alert("Invalid Credentials");
          navigate("/");
        } else {
          navigate("/error");
          res.send(error);
        }
      });
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <StyledBox>
      <Box>
        <Image src={imageURL} alt="login" />
        {/* <Typography
          style={{
            textAlign: "center",
            fontSize: "16px",
            marginTop: "20px",
          }}>
          Demo Account
          <Typography
            style={{
              fontFamily: "monospace",
            }}>
            Username: abc
          </Typography>
          <Typography
            style={{
              fontFamily: "monospace",
            }}>
            Password: abc
          </Typography>
        </Typography> */}
        {accountstate === "login" ? (
          <StyledBox2>
            <StyledTextField
              onChange={(e) => onChangeInput(e)}
              type="text"
              name="username"
              value={login.username}
              variant="standard"
              label="Enter Your Username"
            />
            <StyledTextField
              name="password"
              type="password"
              value={login.password}
              onChange={(e) => onChangeInput(e)}
              variant="standard"
              label="Enter Your Password"
            />

            {error && <StyledError>{error}</StyledError>}

            <LoginButton onClick={() => loginUser(login)} variant="contained">
              Login
            </LoginButton>
            <StyledText style={{ textAlign: "center" }}>OR</StyledText>
            <div id="g_id_onload" data-type="standard"></div>
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
