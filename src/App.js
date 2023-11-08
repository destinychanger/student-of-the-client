import "./App.css";
import ChatView from "./Components/ChatView";
import Navbar from "./Components/Navbar";
import LeftDrawer from "./Components/LeftDrawer";

function App() {
  return (
    <div className="pageLayout">
      <Navbar />
      <div className="drawerContainer">
        <LeftDrawer />
      </div>
      <div className="rightPanel">
        <ChatView />
      </div>
    </div>
  );
}

export default App;
