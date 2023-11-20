import { Link } from "react-router-dom";

const Song = ({ song }) => {

  return(
    <div>
      <h1>{song.title}</h1>
      <h2>{song.artist}</h2>
      <button className="detail-button">
        <Link to={`/songs/${song.id}`}>DETAILS</Link>
      </button>
    </div>
  );
}

export default Song;