import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

function SongEditForm() {
  let { id } = useParams();
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
    setSong({ ...song, [event.target.id]: event.target.value });
  };

    useEffect(() => {
      fetch(`${API}/songs/${id}`)
        .then(response => response.json())
        .then(fetchedSong => {
          setSong(fetchedSong)
        })
        .catch(() => navigate("/not-found"))
    }, [id, navigate]);

  const updateSong = () => {
    const httpOptions = {
      "method" : "PUT",
      "body" : JSON.stringify(song),
      "headers" : {
        "Content-Type" : "application/json"
    }
  }

    fetch(`${API}/songs/${id}`, httpOptions) 
      .then(() => {
        alert(`${song.title} has been updated!`);
        navigate(`/songs`)
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSong();
  };

  return (
    <div className='Edit'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Song Title:</label>
        <input
          id="title"
          value={song.title}
          type="text"
          onChange={handleTextChange}
        />
        <label htmlFor="artist_name">Artist Name:</label>
        <input
          id="name"
          value={song.artist_name}
          type="text"
          onChange={handleTextChange}
        />
        <label htmlFor="album_name">Album:</label>
        <input
          id="album"
          value={song.album}
          type="text"
          onChange={handleTextChange}
        />
        <label htmlFor="year">Year of Release:</label>
        <input
          id="yearOfRelease"
          value={song.year_of_realease}
          type="number"
          onChange={handleTextChange}
        />
        <label htmlFor="genre">Song Genre:</label>
        <input
          id="genre"
          value={song.genre}
          type="text"
          onChange={handleTextChange}
          />
       
          <input className='border border-black rounded-sm px-8 py-2 mb-2' type="submit" onClick={handleSubmit} />

      </form>
      <Link to={`/songs/${id}`}>
        <button className='border border-black rounded-sm px-8 py-2 mb-2'>GO BACK!</button>
      </Link>
    </div>
  );
}

export default SongEditForm;