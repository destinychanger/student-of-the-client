class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowercase = message.toLowerCase();
    console.log("HI THERE", lowercase)
    if (lowercase.includes("")) {
      this.actionProvider.todosHandler(lowercase);
    }
  }
}

// import React from "react";

// const MessageParser = ({ children, actions }) => {
//   const parse = (message) => {
//     const lowercase = message.toLowerCase()

//     if(lowercase.includes("todos")){

//     }
//   };

//   return (
//     <div>
//       {React.Children.map(children, (child) => {
//         return React.cloneElement(child, {
//           parse: parse,
//           actions: {},
//         });
//       })}
//     </div>
//   );
// };

export default MessageParser;
