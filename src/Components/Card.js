// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
// import imageName from "../Assets/CardImages/1.jpg";
// import "./Card.css";
// import EventBus from "./EventBus";

// export default function ActionAreaCard(props) {

//   let getTopicText = (e) => {
//     const topic = e.currentTarget.textContent
//     EventBus.$dispatch("topic", topic)
//   };

//   return (
//     <div className="card" text={props.text} onClick={getTopicText}>
//       <Card sx={{ maxWidth: 345, minHeight: 200, background: "#F2F4FD" }}>
//         <CardActionArea>
//           <CardMedia
//             component="img"
//             height="120"
//             width="14.9375rem"
//             image= {imageName}
//             alt="green iguana"
//           />
//           <CardContent >
//             <Typography variant="body2" color="#0E1F58">
//               {props.text}
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     </div>
//   );
// }




import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import image1 from "../Assets/CardImages/1.jpg";
import image2 from "../Assets/CardImages/2.jpg";
import image3 from "../Assets/CardImages/3.jpg";
import image4 from "../Assets/CardImages/4.jpg";
import image5 from "../Assets/CardImages/5.jpg";
import image6 from "../Assets/CardImages/6.jpg";
import "./Card.css";

export default function ActionAreaCard(props) {
  const images = [image1, image2, image3, image4, image5, image6];

  const ListData = [
    {

      image: image1,
      text: "Explore your client's financial information",
    },
    {

      image: image2,
      text: "Get to know your client's leadership team",
    },
    {

      image: image3,
      text: "Learn about your client's competitors",
    },
    {

      image: image4,
      text: "Understand your client's history",
    },
    {

      image: image5,
      text: "Discover news about your client",
    },
    {

      image: image6,
      text: "Explore your client's published work",
    },
  ];


  return (
    <div className="card">

      <Card sx={{ maxWidth: 345, minHeight: 200, background: "#F2F4FD" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            width="14.9375rem"
            image={ListData[props.key]?.image}
            alt="green iguana"
          />

          <CardContent>
            <Typography variant="body2" color="#0E1F58">
              {ListData[props.key]?.image}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

    </div>
  );
}



