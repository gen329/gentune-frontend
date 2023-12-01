import { useEffect, useState } from "react";
import Song from "./Song";

function Songs() {
  const [songs, setSongs] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/songs`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response unsuccessful.');
      }
      return response.json();
    })
    .then((data) => setSongs(data.data.paylod))
    .catch((error) => console.error("Did not fetch songs", error));
  }, [API]);

  return (
    <div className="container" >
      <section className="ls-wrapper">
        <table className="song-table">
          <thead>
            <tr>
              <th>ALL SONGS</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <Song key={song.id} song={song} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Songs;