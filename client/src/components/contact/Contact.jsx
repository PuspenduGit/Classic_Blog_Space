import { Box, styled, Typography, Link } from "@mui/material";
import BackgroudImage from "../..//assets/images/contact.jpg";
import {
  GitHub,
  Instagram,
  Email,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";

const Banner = styled(Box)`
  background-image: url(${BackgroudImage});
  width: 100%;
  height: 50vh;
  background-position: left 0px top -100px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const Contact = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">Wanna Get In Touch With Me?</Typography>
        <Text variant="h5">Reach out to me on</Text>
        <Link
          href="https://www.linkedin.com/in/puspendu-das-353726203/"
          color="inherit"
          target="_blank">
          <LinkedIn />
        </Link>{" "}
        <Link
          href="https://github.com/PuspenduGit"
          target="_blank"
          color="inherit">
          <GitHub />
        </Link>{" "}
        <Link
          href="https://www.facebook.com/puspendu.das.14268"
          target="_blank"
          color="inherit">
          <Facebook />
        </Link>
        {" "}
        <Link
          href="https://www.instagram.com/_riderpd/"
          target="_blank"
          color="inherit">
          <Instagram />
        </Link>
        {" "}
        <Link
          href="mailto:puspendudas2002@gmail.com?Subject=This is a subject"
          target="_blank"
          color="inherit">
          <Email />
        </Link>
      </Wrapper>
    </Box>
  );
};

export default Contact;
