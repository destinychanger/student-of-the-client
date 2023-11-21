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
import JsPDF from "jspdf";
import newChatButton from '../Assets/CardImages/newChatButton.svg';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function ChatView() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hey there, great to meet you. Welcome to Student of the Client, your personal AI. My goal is to provide you with knowledge and information about a client. Ask me for questions to get more knowledgeable about a client, get help preparing for a meeting, or let’s talk about whatever’s on your mind. For starters, feel free to select a topic from the left-hand menu that you’d like to explore. What would you like to learn about your client? Take your time and know that I’m here to listen. What’s been happening?",
      sentTime: "just now",
      sender: "Bot",
    },
  ]);
  const [clientName, setclientName] = useState(null);
  const [topic, setTopic] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [summary, setSummary] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  EventBus.$on('clientName', (data) => {
    setclientName(data)
  })

  EventBus.$on('topic', (data) => {
    if (clientName) {
      setTopic(data)
    }
  })

  useEffect(() => {
    if (clientName) {
      handleSend(topic);
    }
  }, [topic])

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

    console.log("API MESSS", apiMessages.length)

    if (apiMessages.length > 1) {
      EventBus.$dispatch('disableClientSelection', true)
    }

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
      "https://student-of-the-client-backend-deployment-2-rp6izobdea-uc.a.run.app/api/chat",
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
        console.log(messages)
      });
  }

  const conversation = messages.slice(1).map(function (i) {
    let type = i.sender == 'Bot' ? "Answer" : "Question"
    return (
      `<div style="margin-bottom:10px">
        <span style="color:#0E1F58; font-size:18px; font-weight:700">${type}</span>
        <section style="color:#0E1F58;font-size:18px;">${i.message}</section>
      </div>`
    )
  }).join("")

  const clientSummary = ` <div class="summary">
   <div style="font-size:32px; color:#0E1F58; font-weight:700">Client Summary</div>
     <div style="font-size:22px; color:#0E1F58">${clientName}</div>
     <div>${summary}</div><br/>
    </div>`


  const downloadPdf = () => {
    const doc = new JsPDF({
      orientation: 'p',
      format: 'a4',
      unit: "pt",
    });

    doc.html(`
        <div class="pdfReport">
          ${clientSummary}
          <div style="font-size:32px; color:#0E1F58; font-weight:700">Chat Conversation Extract</div>
          ${conversation}
        </div>`, {
      async callback(doc) {
        await doc.save(`${clientName}_Information_Export`);
      },
      width: 500,
      windowWidth: 1000,
      margin: 30,
    });

  }
  async function generateSummary() {
    await fetch(
      "https://student-of-the-client-backend-deployment-2-rp6izobdea-uc.a.run.app/api/summary",
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
        setSummary(data.response.Answer || data.message);
        setOpen(true);
      });
  }

  const newChat = () => {
    EventBus.$dispatch('disableClientSelection', false);
    setMessages([{
      message:
        "Hey there, great to meet you. Welcome to Student of the Client, your personal AI. My goal is to provide you with knowledge and information about a client. Ask me for questions to get more knowledgeable about a client, get help preparing for a meeting, or let’s talk about whatever’s on your mind. For starters, feel free to select a topic from the left-hand menu that you’d like to explore. What would you like to learn about your client? Take your time and know that I’m here to listen. What’s been happening?",
      sentTime: "just now",
      sender: "Bot",
    },])
  }

  return (
    <div style={{ height: `calc(100vh - 132px)` }}>
      <div class="chatTitle">Student of the Client Chat Model V1.0</div>
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
                {(message.sender == 'Bot' && i != 0) &&
                  <Message.Footer>
                    <div>
                      <Tooltip
                        arrow
                        placement={"left"}
                        title={<div>
                          <div dangerouslySetInnerHTML={{ __html: "<h4>Citation:<h4/>" + messages[i]?.citation }}></div>
                          <div dangerouslySetInnerHTML={{ __html: "<h4>Document Name:<h4/>" + messages[i]?.documentName }}></div>
                          <div dangerouslySetInnerHTML={{ __html: "<h4>Page Number:<h4/>" + messages[i]?.pageNo }}></div>
                        </div>
                        }>
                        <img src={info} id={i}></img>
                      </Tooltip>
                      <img src={up}></img>
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
      <Button disabled={isTyping} className={"newChat"} title="New Chat" onClick={newChat}><img src={newChatButton}></img></Button>
      <Button className={"exportPdf"} title="Export Pdf" disabled={!clientName} onClick={generateSummary}><img src={exportPdf}></img></Button>
      <footer className="footer">
        © 2023 KPMG LLP, a Delaware limited liability partnership and a member firm of the KPMG global organization of independent member firms affiliated with KPMG International Limited, a private English company limited by guarantee. All rights reserved. Use of this system is governed by the <a href="#">Acceptable Use Policy</a> and the <a href="#">Personnel Data Privacy Notice.</a>
      </footer>
      <Dialog
        fullWidth
        maxWidth
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 'fit-content',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div dangerouslySetInnerHTML={{ __html: clientSummary }}></div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div style={{ fontSize: "32px", color: "#0E1F58", fontWeight: 700 }}>Chat Conversation Extract</div>
              <div dangerouslySetInnerHTML={{ __html: conversation }}></div>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }} >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={downloadPdf}>Download</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChatView;
