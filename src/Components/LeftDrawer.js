import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import leftIcon from "../Assets/CardImages/leftIcon.svg";
import rightIcon from "../Assets/CardImages/rightIcon.svg";

import "./LeftDrawer.css";
import Welcome from "./Welcome";
import SearchBar from "./SearchBar";





const LeftDrawer = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    document.getElementsByClassName("rightPanel")[0].style.width="97%"
  };

  return (
    <div className="drawerContainer">
      <IconButton
        size="large"
        edge="start"
        sx={{color:"black", position:"absolute",zIndex:1100,left:"65px"}}
        // color="inherit"
        // backgroundColor="red"
        aria-label="logo"
        onClick={() => {
          setIsDrawerOpen(true);
          document.getElementsByClassName("rightPanel")[0].style.width="67%"
        }}
      >
        {/* <MenuIcon /> */}
        {/* <ChevronRightIcon /> */}
        <img src={rightIcon}/>
      </IconButton>
      <Drawer
      variant="persistent"
        sx={{
          "&.MuiDrawer-root .MuiDrawer-paper": { marginLeft: "67px", width:"30%" },
        }}
        BackdropProps={{style:{backgroundColor:"none", opacity:0}}}
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <IconButton sx={{width:"3rem", backgroundColor:"#fff",position:"absolute", right:5,top:5}} onClick={handleDrawerClose}>
        <img src={leftIcon}/>
        {/* <ChevronLeftIcon sx={{color:"black"}} /> */}
            {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
          </IconButton>
        <div className="leftPanel">
          <Welcome />
          <SearchBar />
        </div>
      </Drawer>
      </div>
  );
};

export default LeftDrawer;
