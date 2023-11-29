import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className="brand">GenTune</h1>
      <ul className="nav ul">
        <button className="border border-black rounded-sm px-6 py-2 mb-2">
          <Link to="/songs">Song Library</Link>
        </button>
        <button className="border border-black rounded-sm px-6 py-2 mb-2">
          <Link to="/songs/new" className="nav ul">Request a Song!</Link>
        </button>
      </ul>
    </nav>
  );
}