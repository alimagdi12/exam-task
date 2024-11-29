import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/Auth/AuthContext";
import AnimationWrapper from "../../hooks/Animation/AnimationWrapper";

// Animated Background Particles
const ParticleBackground = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  zIndex: -1,
  background:
    "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent)",
  animation: "particleMove 20s infinite linear",
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "url('https://www.transparenttextures.com/patterns/circles.png')",
    opacity: 0.2,
  },
  "@keyframes particleMove": {
    "0%": { transform: "translateY(0)" },
    "100%": { transform: "translateY(-100%)" },
  },
}));

// Hero Section
const HeroSection = styled("section")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
}));

// Animated Heading
const AnimatedHeading = styled(Typography)(() => ({
  fontSize: "4rem",
  fontWeight: "bold",
  color: "#fff",
  textShadow: "0px 0px 20px rgba(255, 255, 255, 0.8), 0px 0px 40px #ff4081",
  animation: "letterWave 3s infinite ease-in-out",
  display: "inline-block",
  "@media (max-width: 768px)": { fontSize: "3rem" },
  "@keyframes letterWave": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-20px)" },
  },
}));

// Floating Hero Image
const FloatingImage = styled("img")(() => ({
  width: "100%",
  maxWidth: "300px",
  margin: "2rem 0",
  animation: "float 5s ease-in-out infinite",
  filter: "drop-shadow(0px 10px 20px rgba(255, 255, 255, 0.4))",
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-30px)" },
  },
}));

// Neon Button
const NeonButton = styled(Button)(() => ({
  marginTop: "2rem",
  padding: "1rem 3rem",
  fontSize: "1.2rem",
  borderRadius: "50px",
  background: "linear-gradient(to right, #ff4081, #ff80ab)",
  color: "#fff",
  textTransform: "uppercase",
  boxShadow: "0px 0px 20px rgba(255, 64, 129, 0.8), 0px 0px 40px #ff4081",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0px 0px 30px rgba(255, 64, 129, 1), 0px 0px 50px #ff4081",
    background: "linear-gradient(to right, #ff80ab, #ff4081)",
  },
}));

const SubHeading = styled(Typography)(() => ({
  marginTop: "1rem",
  fontSize: "1.5rem",
  fontStyle: "italic",
  color: "#f8f8f8",
  textShadow: "0px 5px 15px rgba(248, 248, 248, 0.5)",
}));

const Home: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await login();
    setLoading(false);
  };

  return (
    <AnimationWrapper>
      <Box>
        <ParticleBackground />

        <HeroSection>
          <AnimatedHeading>Explore the Future</AnimatedHeading>
          {/* <FloatingImage
            src="../../assets/logo.png"
            alt="Futuristic Image"
          /> */}
          <NeonButton onClick={handleLogin} disabled={loading}>
            {loading ? (
              <CircularProgress size={28} sx={{ color: "#ffffff" }} />
            ) : (
              "Get Started"
            )}
          </NeonButton>
          <SubHeading>Your journey to innovation begins here</SubHeading>
        </HeroSection>
      </Box>
    </AnimationWrapper>
  );
};

export default Home;
