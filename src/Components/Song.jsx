import React from "react";
import { Link } from "react-router-dom";

const Song = ({ song }) => {
  return (
    <tr>
      <td>{song.title}</td>
      <td>{song.artist}</td>
      <td>
        <button className="detail-button">
          <Link to={`/songs/${song.id}`}>DETAILS</Link>
        </button>
      </td>
    </tr>
  );
};

export default Song;
