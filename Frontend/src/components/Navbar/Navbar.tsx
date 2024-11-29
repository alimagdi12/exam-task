import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { IoMenu } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import userImage from "../../assets/user.jpeg";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { INavbar } from "../../modals/modals";
import Popover from "@mui/material/Popover";  
import socket, { setupSocket } from "../../config/socketConfig";
import { useEffect, useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"; // Updated import
import { colors } from "../../utils/colors";  // Ensure colors are imported

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${colors.seaBlue}, ${colors.primary})`, // Updated gradient
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",  // Subtle shadow for a softer look
  transition: "background-color 0.3s ease",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  color: colors.darkGray, 
  "&:hover": {
    backgroundColor: alpha(colors.seaBlue, 0.1), 
    transform: "scale(1.1)",
    transition: "transform 0.2s ease, background-color 0.3s ease",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: colors.darkGray, 
  fontWeight: "bold",
  fontSize: "1.5rem",
  textShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",  // Lighter shadow for clean text
  transition: "color 0.3s ease",
  "&:hover": {
    color: colors.accent,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  border: `2px solid ${colors.seaBlue}`, // Subtle border for better visibility on white
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a clean look
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const Navbar: React.FC<INavbar> = ({ showSidebar }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationsCount, setNotificationsCount] = React.useState<number>(0);
  const [notificationMenuOpen, setNotificationMenuOpen] = React.useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const { logout } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    setupSocket();

    socket.on('exam added', (exam) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        `New exam added: ${exam}`, 
      ]);
      setNotificationsCount((prevCount) => prevCount + 1); 
    });

    return () => {
      socket.off('exam added');
    };
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logOut = () => {
    logout();
    handleMenuClose();
  };

  const toggleSidebar = () => {
    showSidebar();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); 
    setNotificationsCount(0);
    setNotificationMenuOpen(prev => !prev); 
  };

  const handleCloseNotificationMenu = () => {
    setNotificationMenuOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logOut}>SignOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <AnimatedIconButton>
          <Avatar src={userImage} />
        </AnimatedIconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          <AnimatedIconButton onClick={toggleSidebar}>
            <IoMenu size={24} />
          </AnimatedIconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageSwitcher />
            <AnimatedIconButton onClick={handleNotificationClick} sx={{ marginLeft: '20px', marginRight: "40px" }}>
              <IoNotifications size={24} color={'white'} />
              {notificationsCount > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '12px',
                  }}
                >
                  {notificationsCount}
                </Box>
              )}
            </AnimatedIconButton>

            <Popover
              open={notificationMenuOpen}
              onClose={handleCloseNotificationMenu}
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {notifications.length === 0 ? (
                <Box sx={{ padding: '10px', maxWidth: '300px' }}>No new notifications</Box>
              ) : (
                <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {notifications.map((notification, index) => (
                    <Box key={index} sx={{ padding: '10px' }}>
                      {notification}
                    </Box>
                  ))}
                </Box>
              )}
            </Popover>

            <StyledAvatar
              alt="Profile"
              src={userImage}
              onClick={handleProfileMenuOpen}
            />
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      {renderMenu}
      {renderMobileMenu}
    </Box>
  );
};

export default Navbar;
