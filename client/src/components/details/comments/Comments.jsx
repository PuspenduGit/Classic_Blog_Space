import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { useState, useContext, useEffect } from "react";

import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

import Comment from "./Comment";

const Container = styled(Box)(({ theme }) => ({
  margin: "100px 0 0 0",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
  display: "flex",
}));

const Image = styled("img")({
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: 0.5,
});

const TextStyle = styled(TextareaAutosize)`
  width: 100%;
  height: 100px !important;
  border: none;
  font-size: 18px;
  font-family: "Roboto";
  resize: none;
  outline: none;
  margin: 0 20px;
  border-radius: 0.5;
  box-shadow: 0 0 5px gray;
  color: "#878787";
`;

const initialValues = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

export const Comments = ({ post }) => {
  const url =
    "https://images.vexels.com/media/users/3/154702/isolated/preview/02ea9139401feb6921516fb12bb75061-personal-talk-contact-icon.png";

  const [comment, setComment] = useState(initialValues);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { account } = useContext(DataContext);

  useEffect(() => {
    const fetchComments = async () => {
      if(!post._id) return;
      const response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComments(response.data);
      }
    };
    fetchComments();
  }, [post, toggle]);

  const commentChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async () => {
    const response = await API.createComment(comment);
    if (response.isSuccess) {
      setComment(initialValues);
    }
    setToggle(!toggle);
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="Dp" />
        <TextStyle
          name="comments"
          value={comment.comments}
          onChange={(e) => commentChange(e)}
          placeholder="Add a comment..."
          minRows={5}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ height: "40px" }}
          onClick={(e) => addComment()}>
          Post
        </Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment comment={comment} setToggle={setToggle} />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
