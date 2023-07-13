import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)`
  width: 100%;
  background: url(https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)
    center/55% repeat-x #000;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  color: #fff;
  line-height: 1;
`;

const Banner = () => {
  return (
    <Image>
      <Heading>CLASSIC BLOG</Heading>
    </Image>
  );
};

export default Banner;
