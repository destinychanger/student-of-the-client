import "./App.css";
import ChatView from "./Components/ChatView";
import Navbar from "./Components/Navbar";
import LeftDrawer from "./Components/LeftDrawer";

function App() {
  return (
    <div className="pageLayout">
      <Navbar />
      <df-messenger
        project-id="luminous-girder-403107"
        agent-id="674bd417-c9dd-431c-b9cf-523bb8b72bc1"
        className="df-messenger"
        language-code="en">
        <df-messenger-chat-bubble
          chat-title="Student of the Client"
          class="df-messenger">
        </df-messenger-chat-bubble>
      </df-messenger>
      <div className="drawerContainer">
        <LeftDrawer />
      </div>
      <div className="rightPanel">
        <ChatView />
      </div>
    </div >
  );
}

export default App;
