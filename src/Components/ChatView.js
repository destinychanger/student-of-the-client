import { useState, useEffect } from "react";
import "./ChatView.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import bot from "../Assets/CardImages/ai.svg";
import user from "../Assets/CardImages/user.svg";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import EventBus from "./EventBus";
import exportPdf from "../Assets/CardImages/exportPdf.svg";
import info from "../Assets/CardImages/info.svg";
import up from "../Assets/CardImages/thumbsUp.svg";
import down from "../Assets/CardImages/thumbsDown.svg";
import Tooltip from '@mui/material/Tooltip';
import jsPDF from 'jspdf';


function ChatView() {
  const [clientName, setclientName] = useState(null);
  const [topic, setTopic] = useState(null);
  let [counter, setcounter] = useState(1);

  EventBus.$on('clientName', (data) => {
    setclientName(data)
  })

  EventBus.$on('topic', (data) => {
    if (clientName) {
      setTopic(data)

    }
    //handleSend(data);

    console.log(topic);
  })

  useEffect(() => {
    if (clientName) {
      handleSend(topic);
    }

  }, [topic])

  const [messages, setMessages] = useState([
    {
      message:
        "👋 Hey there, great to meet you. Welcome to Student of the Client, your personal AI. My goal is to provide you with   knowledge and information for client engagements, projects, presentations, meetings, etc. Ask me for advice, for answers, or let’s talk about whatever’s on your mind. For starters, feel free to select a topic from the left-hand menu that you’d like to explore. What would you like to learn about your client? Take your time and know that I’m here to listen. What’s been happening?",
      sentTime: "just now",
      sender: "Bot",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [summary, setSummary] = useState(null);

  const HTMLdata = `
  <table id="tableFormat">
    <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>Berglunds snabbköp</td>
      <td>Christina Berglund</td>
      <td>Sweden</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>Ernst Handel</td>
      <td>Roland Mendel</td>
      <td>Austria</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>Island Trading</td>
      <td>Helen Bennett</td>
      <td>UK</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>Königlich Essen</td>
      <td>Philip Cramer</td>
      <td>Germany</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>Laughing Bacchus Winecellars</td>
      <td>Yoshi Tannamuri</td>
      <td>Canada</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>Magazzini Alimentari Riuniti</td>
      <td>Giovanni Rovelli</td>
      <td>Italy</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>North/South</td>
      <td>Simon Crowther</td>
      <td>UK</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
    <tr>
      <td>Paris spécialités</td>
      <td>Marie Bertrand</td>
      <td>France</td>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
      <td>Company</th>
      <td>Contact</th>
      <td>Country</th>
    </tr>
  </table>`

  const handleSend = async (message) => {
    if (!isTyping) {
      const newMessage = {
        message,
        direction: "outgoing",
        sender: "user",
      };

      const newMessages = [...messages, newMessage];

      setMessages(newMessages);
      setIsTyping(true);
      await processMessage(newMessages);
    }

  };

  async function processMessage(chatMessages) {

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Bot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const message = apiMessages[apiMessages.length - 1].content;
    let apiRequestBody;
    if (topic) {
      apiRequestBody = {
        topic: message,
        client: clientName,
        user_message: "",
      };
    } else {
      apiRequestBody = {
        user_message: message,
        client: clientName,
        topic: "",
      };
    }

    setTopic()
    await fetch(
      "https://student-of-the-client-backend-deployment-rp6izobdea-uc.a.run.app/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      },
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.response.Answer || data.message,
            citation: data.response.Citation || "",
            documentName: data.response["Document Name"] || "",
            pageNo: data.response["Page Number"] || "",
            sender: "Bot",
          },
        ]);
        setIsTyping(false);
      });
  }



  const exportChatToPdf = async () => {
    await getSummary();
    console.log(summary)
    // const doc = new jsPDF({
    //   orientation: 'landscape',
    //   format: 'a4',
    //   unit: 'px',
    // });
    // doc.setFontSize(10);
    // doc.html(`${HTMLdata}`, {
    //   async callback(doc) {
    //     await doc.save('pdf_name');
    //   },
    // });
  };

  async function getSummary() {
    await fetch(
      "https://student-of-the-client-backend-deployment-rp6izobdea-uc.a.run.app/api/summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { client: clientName }
        ),
      },
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages(data.Answer || data.message)
      });
  }

  return (
    <div style={{ height: `calc(100vh - 120px)` }}>
      <div class="chatTitle" style={{ padding: 12, height: 45 }}>Student of the Client Chat Model V1.0</div>
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              isTyping ? <TypingIndicator content="Generating Answer" /> : null
            }
          >
            {messages.length > 0 && messages.map((message, i) => {
              return <Message className={message.sender} key={i} model={message} >
                <Avatar size="sm" src={message.sender == "Bot" ? bot : user} />
                {message.sender == 'Bot' &&
                  <Message.Footer>
                    <div>
                      <Tooltip
                        arrow
                        placement={"left"}
                        title={<div><h4>Citation: {messages[i]?.citation || "N/A"}</h4>
                          <h4>Document Name: {messages[i]?.documentName || "N/A"}</h4>
                          <h4>Page Number: {messages[i]?.pageNo || "N/A"}</h4>
                        </div>
                        }>
                        <img src={info} id={i}></img>
                      </Tooltip>
                      <img src={up} ></img>
                      <img src={down}></img>
                    </div>
                  </Message.Footer>
                }
              </Message>
            })}
          </MessageList>
          <MessageInput
            attachButton={false}
            placeholder={clientName ? "Ask me a question!" : "Please select client first"}
            onSend={handleSend}
            disabled={!clientName}
          />
        </ChatContainer>
      </MainContainer>
      {/* <button className="exportPdf" onClick={exportChatToPdf}><img src={exportPdf}></img>Export conversation </button> */}
      <footer className="footer">
        © 2023 KPMG LLP, a Delaware limited liability partnership and a member firm of the KPMG global organization of independent member firms affiliated with KPMG International Limited, a private English company limited by guarantee. All rights reserved. Use of this system is governed by the <a href="#">Acceptable Use Policy</a> and the <a href="#">Personnel Data Privacy Notice.</a>
      </footer>
    </div>
  );
}

export default ChatView;
