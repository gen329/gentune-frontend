import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">GenTune</h1>
      <button className="navbar-button">
        <Link to="/songs">Song Library</Link>
      </button>
      <button>
       <Link to="/songs/new" className="navbar-link">Request a Song!</Link>
      </button>
    </nav>
  );
}