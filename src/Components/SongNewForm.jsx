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

  const handleTextChange = (event) => {
    setSong({...song, [event.target.id]: event.target.value });
  };

  const addSong = () => {
    const httpOptions = {
      method: "POST",
      body: JSON.stringify({
        title: song.title,
        artist: song.artist_name,
        album: song.album,
        year: song.year_of_release,
        genre: song.genre,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    fetch(`${API}/songs`, httpOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        alert(`${data.title} successfully added to database!`);
        navigate('/songs');
      })
      .catch((error) => console.error("Error adding song:", error));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    addSong();
  };

  return (
    <div className='songInfo'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Song Title:</label>
        <input
          id="title"
          value={song.title}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br />
        <label htmlFor="artist">Artist Name:</label>
        <input
          id="artist_name"
          value={song.artist_name}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br />
        <label htmlFor="album">Album Name:</label>
        <input
          id="album"
          value={song.album}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br />
        <label htmlFor="year">Song Year:</label>
        <input
          id="year"
          value={song.year}
          type="number"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" className='border border-black rounded-sm px-8 py-2 mb-2'/>
      </form>
    </div>
  )
}
export default SongNewForm;