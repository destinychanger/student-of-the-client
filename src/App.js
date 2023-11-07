import "./App.css";
import Welcome from "./Components/Welcome";
import SearchBar from "./Components/SearchBar";
import ChatView from "./Components/ChatView";
import Navbar from "./Components/Navbar";

function App() {

  return (
    <div className="pageLayout">
      <Navbar />
      <div className="leftPanel">
        <Welcome />
        <SearchBar />
      </div>
      <div className="rightPanel">
        <ChatView />
      </div>
    </div>
  );
}

export default App;
