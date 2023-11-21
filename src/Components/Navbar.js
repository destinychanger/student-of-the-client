import * as React from "react";

import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    zIndex: 1201,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Navbar() {

  // return (
  //   <Box sx={{ display: "flex" }}>
  //     <CssBaseline />
  //     <Drawer
  //       PaperProps={{
  //         sx: {
  //           backgroundColor: "#244ED9",
  //         }
  //       }}
  //       sx={{
  //         width: drawerWidth,
  //         flexShrink: 0,
  //         "& .MuiDrawer-paper": {
  //           width: drawerWidth,
  //           boxSizing: "border-box",
  //         }
  //       }}
  //       variant="permanent"
  //       anchor="left"
  //     >
  //       <Toolbar />
  //       <List style={{ position: "absolute", width: "100%" }}>
  //         {["Inbox", "Starred"].map((text, index) => (
  //           <ListItem key={text} disablePadding>
  //             <ListItemButton >
  //               <ListItemIcon style={{ minWidth: "40px" }}>
  //                 {index % 2 === 0 ? <MarkUnreadChatAltIcon style={{ color: "#fff" }} /> : <FileUploadIcon style={{ color: "#fff" }} />}
  //               </ListItemIcon>
  //             </ListItemButton>
  //           </ListItem>
  //         ))}
  //       </List>
  //     </Drawer>
  //   </Box>
  // );
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">

          </Typography>
        </Toolbar>

      </AppBar> */}
      <Drawer variant="permanent" open={open}

        PaperProps={{
          sx: {
            backgroundColor: "#244ED9",
          }
        }}
      >
        <DrawerHeader>
          {open &&
            <IconButton onClick={handleDrawerClose} sx={{

              color: 'white'
            }}>
              <ChevronLeftIcon />
            </IconButton>

          }
          {
            !open &&
            <IconButton onClick={handleDrawerOpen} sx={{

              color: 'white'
            }}>
              <ChevronRightIcon />
            </IconButton>
          }

        </DrawerHeader>

        <Divider />
        <List>
          {['Home', 'Add New Client', 'Add New Topic', 'Document Corpus'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: 'white'
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["New Chat"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: 'white'
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>

        </Typography>
        <Typography paragraph>

        </Typography>
      </Box>
    </Box>
  );


}
