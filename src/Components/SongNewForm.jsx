import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL

function SongNewForm() {
  const navigate = useNavigate();
  const [song, setSong] = useState({
    title: "",
    artist_name: "",
    album: "",
    genre: [],
    year_of_release: 0,
    is_favorite: false,
  });

  const addSong = () => {
    fetch(`${API}/songs`, {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/song",
      },
    })
      .then(() => {
        navigate(`/songs`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    event.preventDefault();
    addSong();
  };

  return (
    <div className='newSong'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Song Title:</label>
        <input
          id="title"
          value={song.title}
          type="text"
          onChange={handleTextChange}
          required
        />
        <input type="submit" />
      </form>
    </div>
  )
}
export default SongNewForm;