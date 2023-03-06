import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "./styles/App.css";
function App() {
  // Displays the main component and the navbar
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
