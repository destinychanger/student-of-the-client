// import React from "react";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  todosHandler = (msg) => {
    const message = this.createChatBotMessage("Here you go", {
      widget: "todos",
      currentText: msg
    });
    this.setChatbotMessage(message);
  };

  setChatbotMessage = (message) => {
    console.log("MESSSSSS",message)
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
      //todos: [...state.todos, todos],
      currentText: message.currentText
    }));
  };
}

// const ActionProvider = ({ createChatBotMessage, setState, children }) => {
//   return (
//     <div>
//       {React.Children.map(children, (child) => {
//         return React.cloneElement(child, {
//           actions: {},
//         });
//       })}
//     </div>
//   );
// };

export default ActionProvider;
