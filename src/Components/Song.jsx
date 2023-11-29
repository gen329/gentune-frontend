import React from "react";
import { Link } from "react-router-dom";

const Song = ({ song }) => {
  return (
    <tr className="songItem">
      <td className="pr-8 pl-10">{song.title}</td>
      <td className="align-items"> {song.artist_name}</td>
      <td>
        <button className="border border-black rounded-sm px-5 py-1">
          <Link to={`/songs/${song.id}`} className="details-link">
            DETAILS
          </Link>
        </button>
      </td>
    </tr>
  );
};

export default Song;
