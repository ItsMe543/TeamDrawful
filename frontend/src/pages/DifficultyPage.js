import { Link } from "react-router-dom";
import "../styles/Difficulty.css";
function DifficultyPage() {
  return (
    <div className="d-title">
      Choose a difficulty
      <div className="diff">
        <form action="/drawing" className="form">
          <input type="number" placeholder="Difficulty / 5" required />
          <br />
          <Link to="/drawing" className="DrawingLink">
            Start
          </Link>
        </form>
      </div>
    </div>
  );
}
export default DifficultyPage;
//<input type="submit" value="Submit" />