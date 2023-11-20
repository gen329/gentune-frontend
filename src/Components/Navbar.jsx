import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <header>
        GenTune
      </header>
      <button>
        <Link to="/songs">Song Library</Link>
      </button>
      <button>
        Request a Song!
      </button>
    </nav>
  );
}