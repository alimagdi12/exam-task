import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { styles } from "./ExamTips.styles";
import { colors } from "../../utils/colors";
import { useTranslation } from "react-i18next";

const ExamTips = () => {
  const { t, i18n } = useTranslation();
  const [examImage, setExamImage] = useState<string | null>(null);

  useEffect(() => {
    import("../../assets/exam4.avif")
      .then((module) => {
        setExamImage(module.default);
      })
      .catch(() => {
        setExamImage(null);
      });
  }, []);

  const isRTL = i18n.language === "ar"; // Check if the current language is Arabic

  return (
    <Container
      sx={{
        ...styles.container,
        flexDirection: { xs: "column", md: isRTL ? "row-reverse" : "row" }
      }}
    >
      <Box
        sx={{
          flex: 1,
          textAlign: isRTL ? "right" : "left",
          animation: "fadeIn 1s ease",
          padding: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: colors.primary,
            textTransform: "capitalize",
          }}
        >
          {t("title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: colors.lightBlack,
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          {t("intro")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            color: "#7a7a7a",
            mb: 3,
          }}
        >
          {t("quote")}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            padding: "8px 16px",
            background: `linear-gradient(45deg, ${colors.accent}, ${colors.primary})`,
            color: "white",
            fontSize: "1rem",
            textTransform: "uppercase",
            borderRadius: "20px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
            },
          }}
        >
          {t("getStarted")}
        </Button>
      </Box>
      {examImage && (
        <Box
          component="img"
          src={examImage}
          alt={t("examItems")}
          sx={{
            flex: 1,
            maxWidth: { xs: "100%", md: "400px" },
            width: "100%",
            animation: "zoomIn 1.2s ease",
            margin: { xs: "20px auto", md: 0 },
            borderRadius: "10px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
    </Container>
  );
};

export default ExamTips;
