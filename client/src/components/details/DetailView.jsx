import { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useParams, useNavigate, Link } from "react-router-dom";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
  display: "flex",
  flexDirection: "column",
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)({
  fontSize: "38px",
  fontWeight: "600",
  textAlign: "center",
  margin: "15px 0 10px 0",
  wordBreak: "break-word",
});

const EditIcon = styled(Edit)({
  float: "right",
  margin: "5px",
  padding: "5px",
  border: "1px solid gray",
  borderRadius: "10px",
});

const DeleteIcon = styled(Delete)({
  float: "right",
  margin: "5px",
  padding: "5px",
  border: "1px solid gray",
  borderRadius: "10px",
});

const Author = styled(Box)({
  float: "right",
  display: "flex",
  margin: "20px 0",
  alignItems: "center",
  color: "#878787",
});

const Description = styled(Typography)({
  wordBreak: "break-word",
});

const DetailView = () => {
  const [post, setPost] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();
  const { account } = useContext(DataContext);

  const url = post.photo
    ? post.photo
    : "https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2018/07/Start-blog-in-minutes.png?f=webp&q=90";

  useEffect(() => {
    const getPost = async () => {
      const response = await API.getPostById(id);
      if (response.isSuccess) {
        console.log(response.data);
        setPost(response.data);
      }
    };
    getPost();
  }, []);

  const deletePost = async () => {
    const response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={url} alt="post" />

      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" sx={{ cursor: "pointer" }} />
            </Link>
            <DeleteIcon
              onClick={() => deletePost()}
              color="error"
              sx={{ cursor: "pointer" }}
            />
          </>
        )}
      </Box>

      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
        </Typography>
        <Typography style={{ marginLeft: "auto " }}>
          {new Date(post.createDate).toDateString()}
        </Typography>
      </Author>

      <Description>{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
