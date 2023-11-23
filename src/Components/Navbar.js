import * as React from "react";

import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../Assets/CardImages/kpmgLogo.svg";
import newChat from "../Assets/CardImages/newChat.svg"
import navbarArrow from "../Assets/CardImages/navbarArrow.svg";
import navbarArrowLeft from "../Assets/CardImages/navbarArrowLeft.svg";
import home from "../Assets/CardImages/home.svg";
import users from "../Assets/CardImages/users.svg";
import newTopic from "../Assets/CardImages/newTopic.svg";
//import newChat from "../Assets/CardImages/newChat.svg";
import EventBus from "./EventBus";



export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const resetChat = () => {
    EventBus.$dispatch('newChat', true);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#244ED9",
          },
        }}
      >
        <DrawerHeader>
          {open && (
            <div>
              <img
                className="logo"
                style={{ position: "absolute", left: "20px" }}
                src={logo}
              ></img>
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  color: "white",
                }}
              >
                <img src={navbarArrowLeft} />
              </IconButton>
            </div>
          )}
          {!open && (
            <IconButton
              onClick={handleDrawerOpen}
              sx={{
                color: "white",
                marginRight: "9px"
              }}
            >
              <img src={navbarArrow} />
            </IconButton>
          )}
        </DrawerHeader>

        <Divider />
        <List>
          {["Home", "Add New Client", "Add New Topic"].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "white",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >

                    {index === 0 && <img title="Home" src={home} />}
                    {index === 1 && <img title="Add New Client" src={users} />}
                    {index === 2 && <img title="Add New Topic" src={newTopic} />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
        <Divider />
        <List>
          {["New Chat"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }} onClick={resetChat}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: open ? "#244ED9" : "white",
                  background: open ? "white" : "initial",
                  border: open ? "solid 1px white" : "initial",
                  borderRadius: 5,
                  padding: open ? "0" : "20px",
                  '&:hover': {
                    background: open ? "white" : "initial",
                  },
                  textAlign: open ? "center" : "initial",
                }}
              >
                {
                  !open &&
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {<img title="New Chat" src={newChat} />}
                  </ListItemIcon>
                }

                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  zIndex: 1201,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));