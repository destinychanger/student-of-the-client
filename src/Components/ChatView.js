import { useState, useEffect } from "react";
import "./ChatView.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import bot from "../Assets/CardImages/ai.svg";
import user from "../Assets/CardImages/user.svg";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, Avatar } from "@chatscope/chat-ui-kit-react";
import EventBus from "./EventBus";
import exportPdf from "../Assets/CardImages/exportPdf.svg";
import info from "../Assets/CardImages/info.svg";
import up from "../Assets/CardImages/thumbsUp.svg";
import down from "../Assets/CardImages/thumbsDown.svg";
import Tooltip from "@mui/material/Tooltip";
import JsPDF from "jspdf";
import download from "../Assets/CardImages/download.svg";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";


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
  const [reference, setReference] = useState("1");
  const [openReferenceBox, setopenReferenceBox] = useState(false);
  const [referenceDetails, setreferenceDetails] = useState([]);
  const [conversationId, setconversationId] = useState(null);
  const handleChange = (event, newValue) => {
    setReference(newValue);
  };

  const showReference = (citation, document, page) => {
    setopenReferenceBox(true);
    setreferenceDetails([citation, document, page]);
  };

  const closeReferenceBox = () => {
    setopenReferenceBox(false);
  };

  const handleClose = () => setOpen(false);
  EventBus.$on("clientName", (data) => {
    setclientName(data);
  });

  EventBus.$on("topic", (data) => {
    if (clientName) {
      setTopic(data);
    }
  });

  EventBus.$on("newChat", (data) => {
    EventBus.$dispatch("disableClientSelection", false);
    setconversationId(null)
    setMessages([
      {
        message:
          "Hey there, great to meet you. Welcome to Student of the Client, your personal AI. My goal is to provide you with knowledge and information about a client. Ask me for questions to get more knowledgeable about a client, get help preparing for a meeting, or let’s talk about whatever’s on your mind. For starters, feel free to select a topic from the left-hand menu that you’d like to explore. What would you like to learn about your client? Take your time and know that I’m here to listen. What’s been happening?",
        sentTime: "just now",
        sender: "Bot",
      },
    ]);
  });

  useEffect(() => {
    if (clientName) {
      handleSend(topic);
    }
  }, [topic]);

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

    console.log("API MESSS", apiMessages.length);

    if (apiMessages.length > 1) {
      EventBus.$dispatch("disableClientSelection", true);
    }

    const message = apiMessages[apiMessages.length - 1].content;
    let apiRequestBody;




    if (topic) {

      if (conversationId) {
        apiRequestBody = {
          topic: message,
          client: clientName,
          user_message: "",
          conversation_thread_id: conversationId
        };
      } else {
        apiRequestBody = {
          topic: message,
          client: clientName,
          user_message: "",

        };
      }


    } else {

      if (conversationId) {
        apiRequestBody = {
          user_message: message,
          client: clientName,
          topic: "",
          conversation_thread_id: conversationId
        };
      } else {
        apiRequestBody = {
          user_message: message,
          client: clientName,
          topic: "",

        };
      }

    }

    setTopic();
    await fetch("https://student-of-the-client-backend-deployment-2-rp6izobdea-uc.a.run.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
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
        setconversationId(data.response.conversation_thread_id)
        console.log(messages);
      })
      .catch((error) => {
        setIsTyping(false);
        setMessages([
          ...chatMessages,
          {
            message: "Something went wrong",
            sender: "Bot",
          },
        ]);
      });
  }

  const conversation = messages
    .slice(1)
    .map(function (i) {
      let type = i.sender == "Bot" ? "Answer" : "Question";
      return `<div style="margin-bottom:5px">
        <span style="color:#0E1F58; font-size:18px; font-weight:700">${type}</span>
        <section style="color:#0E1F58;font-size:16px;">${i.message}</section>
      </div>`;
    })
    .join("");

  const clientSummary = ` <div class="summary">
   <div style="font-size:24px; color:#0E1F58; font-weight:700; margin-bottom:10px">Client Summary</div>
     <div style="font-size:18px; color:#0E1F58; font-weight:700">${clientName}</div>
     <div style="font-size:16px; color:#0E1F58">${summary}</div><br/>
    </div>`;

  const downloadPdf = () => {
    const doc = new JsPDF({
      orientation: "p",
      format: "a4",
      unit: "pt",
    });

    doc.html(
      `
        <div class="pdfReport">
          ${clientSummary}
          <div style="font-size:24px; color:#0E1F58; font-weight:700">Chat Conversation Extract</div>
          ${conversation}
        </div>`,
      {
        async callback(doc) {
          await doc.save(`${clientName}_Information_Export`);
        },
        width: 500,
        windowWidth: 1000,
        margin: 30,
      },
    );
  };
  async function generateSummary() {
    setOpen(true);
    await fetch("https://student-of-the-client-backend-deployment-2-rp6izobdea-uc.a.run.app/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client: clientName }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setSummary(data.response.Answer || data.message);
      }).catch((error) => {
        setSummary("Something went wrong");
      });
  }

  // const newChat = () => {
  //   EventBus.$dispatch('disableClientSelection', false);
  //   setMessages([{
  //     message:
  //       "Hey there, great to meet you. Welcome to Student of the Client, your personal AI. My goal is to provide you with knowledge and information about a client. Ask me for questions to get more knowledgeable about a client, get help preparing for a meeting, or let’s talk about whatever’s on your mind. For starters, feel free to select a topic from the left-hand menu that you’d like to explore. What would you like to learn about your client? Take your time and know that I’m here to listen. What’s been happening?",
  //     sentTime: "just now",
  //     sender: "Bot",
  //   },])
  // }

  return (
    <div style={{ height: `calc(100vh - 132px)` }}>
      <div class="chatTitle">Student of the Client Chat Model V1.0</div>
      <MainContainer>
        <ChatContainer>
          <MessageList typingIndicator={isTyping ? <TypingIndicator content="Generating Answer" /> : null}>
            {messages.length > 0 &&
              messages.map((message, i) => {
                return (
                  <Message className={message.sender} key={i} model={message}>
                    <Avatar size="sm" src={message.sender == "Bot" ? bot : user} />
                    {message.sender == "Bot" && i != 0 && (
                      <Message.Footer>
                        <div>
                          {/* <Tooltip
                            arrow
                            placement={"left"}
                            title={
                              <div>
                                <div dangerouslySetInnerHTML={{ __html: "<h4>Citation:<h4/>" + messages[i]?.citation }}></div>
                                <div dangerouslySetInnerHTML={{ __html: "<h4>Document Name:<h4/>" + messages[i]?.documentName }}></div>
                                <div dangerouslySetInnerHTML={{ __html: "<h4>Page Number:<h4/>" + messages[i]?.pageNo }}></div>
                              </div>
                            }
                          >
                            <img src={info} id={i}></img>
                          </Tooltip> */}
                          <img src={info} onClick={() => { showReference(messages[i]?.citation, messages[i]?.documentName, messages[i]?.pageNo) }} id={i}></img>
                          <img src={up}></img>
                          <img src={down}></img>
                        </div>
                      </Message.Footer>
                    )}
                  </Message>
                );
              })}
          </MessageList>
          <MessageInput attachButton={false} placeholder={clientName ? "Ask me a question!" : "Please select client first"} onSend={handleSend} disabled={!clientName} />
        </ChatContainer>
      </MainContainer>
      {/* <Button disabled={isTyping} className={"newChat"} title="New Chat" onClick={newChat}><img src={newChatButton}></img></Button> */}
      <Button className={"exportPdf"} title="Export Pdf" disabled={!clientName} onClick={generateSummary}>
        <img src={exportPdf}></img>
      </Button>
      <footer className="footer">
        © 2023 KPMG LLP, a Delaware limited liability partnership and a member firm of the KPMG global organization of independent member firms affiliated with KPMG International
        Limited, a private English company limited by guarantee. All rights reserved. Use of this system is governed by the <a href="#">Acceptable Use Policy</a> and the{" "}
        <a href="#">Personnel Data Privacy Notice.</a>
      </footer>
      <Dialog fullWidth maxWidth open={open} onClose={handleClose}>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div dangerouslySetInnerHTML={{ __html: clientSummary }}></div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div style={{ fontSize: "24px", color: "#0E1F58", fontWeight: 700, marginBottom: 10 }}>Chat Conversation Extract</div>
              <div dangerouslySetInnerHTML={{ __html: conversation }}></div>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button sx={{ color: "#244ED9", padding: "7px 15px", border: "solid 1px #CED2D9", borderRadius: "10px" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{
              color: "#FFF",
              background: "#244ED9",
              padding: "7px 15px",
              border: "solid 1px #244ED9",
              borderRadius: "10px",
              "&:hover": {
                background: "#244ED9",
              },
            }}
            onClick={downloadPdf}
          >
            <img src={download} />
            Download
          </Button>
        </DialogActions>
      </Dialog>
      {openReferenceBox && (
        <Box
          sx={{
            typography: "body1",
            top: 0,
            position: "absolute",
            right: 0,
            zIndex: 222222,
            background: "white",
            width: 500,
            textAlign: "left",
            border: "solid 1px #CED2D9",
          }}
        >
          <TabContext value={reference} >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="References" value="1" />
                {/* <Tab label="Citation" value="2" /> */}
                <ClearRoundedIcon sx={{ position: "absolute", right: 10, top: 10 }} onClick={closeReferenceBox} />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{
              background: "#F2F4FD",
              height: 'calc(100vh - 50px)',
              overflow: "auto",
              color: "#0E1F58",
            }}>
              <div className="refrencesTitle">Document Name:</div>
              <div className="refrences" dangerouslySetInnerHTML={{ __html: referenceDetails[1] }}></div>
              <div className="refrencesTitle">Page No:</div>
              <div className="refrences" dangerouslySetInnerHTML={{ __html: referenceDetails[2] }}></div>
              <div className="refrencesTitle">Citation:</div>
              <div className="refrences" dangerouslySetInnerHTML={{ __html: referenceDetails[0] }}></div>
            </TabPanel>
            {/* <TabPanel value="2" sx={{
              background: "#F2F4FD", height: 'calc(100vh - 50px)',
              overflow: "auto"
            }}>
              
            </TabPanel> */}
          </TabContext>
        </Box>
      )
      }

    </div >
  );
}

export default ChatView;
