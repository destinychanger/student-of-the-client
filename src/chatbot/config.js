import { createChatBotMessage } from "react-chatbot-kit";
import Todos from "../Components/Todos/Todos";

const config = {
  botName: "Student of the Client Chat Modal V1.0",
  initialMessages: [
    createChatBotMessage(
      `👋 Hey there, great to meet you. Welcome to Student of the Client, your personal AI. My goal is to provide you with   knowledge and information for client engagements, projects, presentations, meetings, etc. Ask me for advice, for answers, or let’s talk about whatever’s on your mind. 
    For starters, feel free to select a topic from the left-hand menu that you’d like to explore. What would you like to learn about your client? Take your time and know that I’m here to listen. What’s been happening?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  state: {
    todos: [],
  },
  widgets: [
    {
      widgetName: "todos",
      widgetFunc: (props) => <Todos {...props} />,
      mapStateToProps: ["todos"],
    },
  ],
};

//   initialMessages: [
//     createChatBotMessage(`Hello. What do you want to learn`, {
//       widget: "options",
//     }),
//   ],
//   widgets: [
//     {
//       widgetName: "options",
//       widgetFunc: (props) => <Options {...props} />,
//     },
//     {
//       widgetName: "javascriptQuiz",
//       widgetFunc: (props) => <Quiz {...props} />,
//       props: {
//         questions: [
//           {
//             question: "What is closure?",
//             answer:
//               "Closure is a way for a function to retain access to it's enclosing function scope after the execution of that function is finished.",
//             id: 1,
//           },
//           {
//             question: "Explain prototypal inheritance",
//             answer:
//               "Prototypal inheritance is a link between an object and an object store that holds shared properties. If a property is not found on the host object, javascript will check the prototype object.",
//             id: 2,
//           },
//         ],
//       },
//     },
//   ],
// };

export default config;
