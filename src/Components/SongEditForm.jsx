import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

function SongEditForm() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [song, setSong] = useState({
    title:"",
    artist_name: "",
    album:"",
    genre: [],
    year_of_realease: 0,
    is_favorite: false,
  });

  const handleTextChange = (event) => {
    setSong({...song, [event.target.id]: event.target.value });
  };

  const updatedSong = () => {
    console.log(`${API}/songs/${id}`);

    fetch(`${API}/songs/${id}`, {
      method: "PUT",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        navigate(`/songs/${id}`);
      })
      .catch((error) => console.error("catch", error));
  };

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((responseJSON) => {
      setSong(responseJSON);
    })
    .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatedSong();
  };

  return (
    <div className='Edit'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Song Title:</label>
        <input
          id="name"
          value={song.title}
          type="text"
          onChange={handleTextChange}
          required
          />
      </form>
    </div>
  )
}

export default SongEditForm;