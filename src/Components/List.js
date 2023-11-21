import { React } from "react";
import "./List.css"
import image1 from "../Assets/CardImages/1.png";
import image2 from "../Assets/CardImages/2.jpg";
import image3 from "../Assets/CardImages/3.jpg";
import image4 from "../Assets/CardImages/4.jpg";
import image5 from "../Assets/CardImages/5.jpg";
import image6 from "../Assets/CardImages/6.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import EventBus from "./EventBus";

const ListData = [
  {
    id: 1,
    image: image1,
    text: "Explore your client's financial information",
    cardIsDisabled: false
  },
  {
    id: 4,
    image: image4,
    text: "Understand your client's history",
    cardIsDisabled: false
  },
  {
    id: 2,
    image: image2,
    text: "Get to know your client's leadership team",
    cardIsDisabled: false
  },
  {
    id: 3,
    image: image3,
    text: "Learn about your client's competitors",
    cardIsDisabled: false
  },
  {
    id: 5,
    image: image5,
    text: "Discover news about your client",
    cardIsDisabled: false
  },
  {
    id: 6,
    image: image6,
    text: "Explore your client's published work",
    cardIsDisabled: false
  },
];

let getTopicText = (e) => {
  const topic = e.currentTarget.textContent
  EventBus.$dispatch("topic", topic)
};

const List = (props) => {
  //create a new array by filtering the original array
  const filteredData = ListData.filter((el) => {
    //if no input the return the original
    if (props.input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.text.toLowerCase().includes(props.input);
    }
  });
  return (
    <ul className="cards">

      {filteredData.map((item) => (
        <div className="card" text={item.text} onClick={item.cardIsDisabled ? undefined : getTopicText}>
          <Card sx={{ opacity: item.cardIsDisabled ? 0.5 : 1, maxWidth: 345, minHeight: 200, background: "#F2F4FD", borderRadius: "24px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="120"
                width="14.9375rem"
                image={item.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="body2" color="#0E1F58">
                  {item.text}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}

    </ul>
  );
}

export default List;
