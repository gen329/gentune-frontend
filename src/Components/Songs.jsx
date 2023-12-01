import { useEffect, useState } from "react";
import Song from "./Song";

function Songs() {
  const [songs, setSongs] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/songs`)
    console.log(`${API}`)
    .then((response) => response.json())
    .then((data) => setSongs(data.data.payload))
    .catch((error) => console.error(error, "Did not fetch songs"));
  }, []);

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