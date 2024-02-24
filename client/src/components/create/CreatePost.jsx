import {
  FormControl,
  Box,
  styled,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
  display: "flex",
  flexDirection: "column",
}));

const Image = styled("img")`
  width: 100%;
  height: 50vh;
  object-fit: cover;
  object-position: center;
`;
const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
  &:focus {
    border: 1px solid tomato;
  }
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  border: none;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;
const initialPost = {
  title: "",
  description: "",
  photo: "",
  username: "",
  categories: "",
  createDate: new Date(),
};

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  const url = post.photo
    ? post.photo
    : "https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2018/07/Start-blog-in-minutes.png?f=webp&q=90";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        try {
          const image = await API.uploadFile(data);
          setPost({ ...post, photo: image.data });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  },[file, post, location.search, account.username]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    let response = await API.createPost(post);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={url} alt="banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" style={{ cursor: "pointer" }} />
        </label>
        <input
          type="file"
          id="fileInput"
          format="image/png, image/jpeg, image/jpg"
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <StyledInputBase
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
        />
        <Button variant="contained" color="primary" onClick={() => savePost()}>
          Publish
        </Button>
      </StyledFormControl>

      <TextArea
        name="description"
        onChange={(e) => handleChange(e)}
        minRows={5}
        placeholder="Tell your story..."
      />
    </Container>
  );
};

export default CreatePost;
