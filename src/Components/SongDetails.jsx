import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL

function SongDetails() {
  const [song, setSong] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
    .then(response => response.json())
    .then(song => {
      setSong(song)
    })
    .catch(() => navigate("/not-found"))
  }, [id, navigate]);

  const handleDelete = () => {
    const httpOptions = { "method" : "DELETE"};
    fetch(`${API}/songs/${id}`, httpOptions)
    .then((res) => {
      alert("Song was deleted!")
      navigate('/songs');
    })
    .catch((err) => console.error(err))
  };

  if (!song) {
    return <div className='loading-icon'>LOADING...</div>;
  }

  return (
    <article className='songInfo'>
      <h1 className='h1'>SONG DETAILS</h1>
      <h2 className='song-title'>Title: {song.title}</h2>
      <p className='song-artist'> Artist: {song.artist_name}</p>
      <p className='song-album'>Album: {song.album}</p>
      <p className='song-year'>Year: {song.year_of_release}</p>
      <div className='mt-2'>
        <button className="border border-black rounded-sm px-8 py-2 mb-2">
          <Link to={`/songs`}>Back to Song Library</Link>
        </button>
        <br />
        <button className="border border-black rounded-sm px-8 py-2 mb-2">
          <Link to={`/songs/${id}/edit`} className='details-link'>Edit Song Info</Link>
        </button>
        <br />
        <button onClick={handleDelete} className="border border-black rounded-sm px-8 py-2 mb-2">Delete Song</button>
      </div>
    </article>
  );
}

export default SongDetails;