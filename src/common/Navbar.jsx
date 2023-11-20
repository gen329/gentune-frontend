import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>GenTune</h1>
      <button>
        <Link to="/songs">Song Library</Link>
      </button>
      <button>
       <Link to="/songs/new">Request a Song!</Link>
      </button>
    </nav>
  );
}