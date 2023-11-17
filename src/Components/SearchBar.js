import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import List from "./List";
import "./SearchBar.css";
import EventBus from "./EventBus";

const SearchBar = () => {
  const clientDropdownList = [
    { label: 'Apple Inc.' },
    { label: 'Johnson & Johnson' },
    { label: 'Nike' },
    { label: 'Chevron Corporation' },
    { label: 'Hess Corporation' },
  ]

  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    var text = e.target.value.toLowerCase();
    setInputText(text);
  };

  let clientChange = (e) => {
    var clientName = e.target.innerText;
    EventBus.$dispatch("clientName", clientName)
  };

  return (
    <div className="main">
      <div className="search">
        <Stack direction="column" spacing={2}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: "98%", fontSize: 12, border: "1px solid #CED2D9", background: "#FFF", borderRadius: "10px", "& fieldset": { border: 'none' } }}
            options={clientDropdownList}
            onChange={clientChange}
            renderInput={(params) => <TextField {...params} label="Select Client" />}
          />
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            label="Search for desired topic"
            placeholder="Search for desired topic"
            sx={{ width: "98%", border: "1px solid #CED2D9", background: "#FFF", borderRadius: "10px", "& fieldset": { border: 'none' } }}
            style={{ borderadius: "8px" }}
          />
        </Stack>
        <List input={inputText} />
      </div>
    </div>
  );
};

export default SearchBar;
