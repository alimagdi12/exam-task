import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { AiFillHome } from "react-icons/ai"; 
import { BsCalendar } from "react-icons/bs"; 
import { HiBookOpen } from "react-icons/hi";
import { MdSchool } from "react-icons/md"; 
import { FiBarChart } from "react-icons/fi"; 
import { IoIosNotifications } from "react-icons/io"; 
import { colors } from "../../utils/colors";
import { styles } from "./Sidebar.styles";
import { ISidebar } from "../../modals/modals";

const Sidebar: React.FC<ISidebar> = ({ show }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Dashboard");

  const handleListItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: colors.seaBlue,  
          transition: "transform 0.3s ease-in-out",
          transform: show ? "translateX(0)" : "translateX(-100%)",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)"
        }
      }}
      open={show}
    >
      <h1 style={styles.h1}>
        <img src="/logo.png" alt="Logo" style={{width:'90px',borderRadius:'50%'}}/>
      </h1>
      <List>
        {[
          { text: "Dashboard", icon: <AiFillHome /> },
          { text: "Schedule", icon: <BsCalendar /> },
          { text: "Courses", icon: <HiBookOpen /> },
          { text: "Gradebook", icon: <MdSchool /> },
          { text: "Performance", icon: <FiBarChart /> },
          { text: "Announcement", icon: <IoIosNotifications /> }
        ].map(({ text, icon }) => (
          <ListItemButton
            key={text}
            onClick={() => handleListItemClick(text)}
            sx={{
              backgroundColor: selectedItem === text ? "white" : "transparent",
              color: selectedItem === text ? colors.seaBlue : "white",  
              "&:hover": {
                backgroundColor: selectedItem === text
                  ? "white"
                  : "rgba(0, 0, 0, 0.08)",  
              },
              marginBottom:'30px'
            }}
          >
            <ListItemIcon
              style={{
                color: selectedItem === text ? colors.seaBlue : "inherit", 
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
