import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const drawerWidth = 60;




export default function Navbar() {


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#244ED9",
          }
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <List style={{ position: "absolute", width: "100%" }}>
          {["Inbox", "Starred"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton >
                <ListItemIcon style={{ minWidth: "40px" }}>
                  {index % 2 === 0 ? <MarkUnreadChatAltIcon style={{ color: "#fff" }} /> : <FileUploadIcon style={{ color: "#fff" }} />}
                </ListItemIcon>
                {/* <ListItemText primary={text} /> */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

//,backgroundColor:"#0E1F58"
//color:"#fff"
