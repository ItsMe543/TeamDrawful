import { Link } from "react-router-dom";
import "../styles/Difficulty.css";
function DifficultyPage() {
  return (
    <div className="d-title">
      Enter username
      <div className="diff">
        <form action="/drawing" className="form">
          <input type="text" placeholder="Username" required />
          <br />
          <input type="number" placeholder="Difficulty / 5" required />
          <br />
          
        </form>
      </div>
    </div>
  );
}
export default DifficultyPage;
//<input type="submit" value="Submit" />