import { useEffect, useState } from "react";
import Song from "./Song";

const API = import.meta.env.VITE_API_URL;

function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`${API}/songs`)
    .then((response) => response.json())
    .then((data) => setSongs(data.data.payload))
    .catch((error) => console.error(error, "Did not fetch movies"));
  }, []);

  return (
    <div className="container">
      <section>
        <table>
          <thead>{/* Your table headers go here */}</thead>
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