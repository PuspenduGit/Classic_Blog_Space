import { Box, styled, Typography, Link } from "@mui/material";

const Banner = styled(Box)`
  background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  & > h3{
    margin-top: 20px;
  },
  & > h5 {
    margin-top: 20px;
    align-items: center;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const About = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h5">Puspendu Das</Typography>
        <Text variant="h5">
          I'm an enthusiatic full stack developer with a passion for building
          things and exploring new technologies.
        </Text>
        <Text variant="h5">
          I am a 2024 grad student pursuing my B.Tech in Information Technology
          from{" "}
          <Link href="https://www.linkedin.com/school/jalpaiguri-government-engineering-college/" target="_blank">
            Jalpaiguri Government Engineering College
          </Link>
          .
        </Text>
      </Wrapper>
    </Box>
  );
};

export default About;
