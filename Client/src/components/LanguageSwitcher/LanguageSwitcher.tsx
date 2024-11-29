import { useTranslation } from "react-i18next";
import { Button, Box } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={() => changeLanguage("en")}
        sx={{
          color: '#ffffff',
          textTransform: 'none',
          padding: '6px 12px',
          marginLeft: '15px',
          fontSize: '14px',
          backgroundColor: 'transparent',
          "&:hover": {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        English
      </Button>
      <Button
        onClick={() => changeLanguage("ar")}
        sx={{
          color: '#ffffff',
          textTransform: 'none',
          padding: '6px 12px',
          marginLeft: '15px',
          fontSize: '14px',
          backgroundColor: 'transparent',
          "&:hover": {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        العربية
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
