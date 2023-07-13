import { Box, Typography, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useContext } from "react";

import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

const Component = styled(Box)(({ theme }) => ({
  margin: "30px 0 0 0",
  backgroundColor: "#f5f5f5",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
  display: "flex",
  flexDirection: "column",
}));

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  borderBottom: "1px solid #d4d4d4",
});

const NameStyle = styled(Typography)({
  fontWeight: "600",
  marginRight: "16px",
});

const DateStyle = styled(Typography)({
  color: "#878787",
  marginRight: "20px",
});

const DeleteStyle = styled(DeleteIcon)({
  cursor: "pointer",
  marginLeft: "auto",
});

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);

  const removeComment = async () => {
    let response = await API.deleteComment(comment._id);
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };

  return (
    <Component>
      <Container>
        <NameStyle>{comment.name}</NameStyle>
        <DateStyle>{new Date(comment.date).toDateString()}</DateStyle>
        {comment.name === account.username && (
          <DeleteStyle onClick={() => removeComment()} color="error" />
        )}
      </Container>
      <Typography>{comment.comments}</Typography>
    </Component>
  );
};

export default Comment;
