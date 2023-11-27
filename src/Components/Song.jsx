import React from "react";
import { Link } from "react-router-dom";

const Song = ({ song }) => {
  return (
    <tr className="flex flex-row justify-between">
      <td className="pr-8">{song.title}</td>
      <td className="align-items"> {song.artist_name}</td>
      <td>
        <button className="border border-black rounded-sm px-8 py-2 mb-2">
          <Link to={`/songs/${song.id}`} className="details-link">
            DETAILS
          </Link>
        </button>
      </td>
    </tr>
  );
};

export default Song;
