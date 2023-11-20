import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

function SongDetails() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await fetch(`${API}/songs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch song detials');
        }
        const data = await response.json();
        setSong(data);
      } catch (error) {
        console.error('Fetch error', error);
        setError('Failed to fetch data. Please try again.')
      }
    };
    fetchSongDetails();
  }, [id]);

  const handleDelete = () => {
    const httpOptions = { method: "DELETE" }
    fetch(`${API}/songs/${id}`, httpOptions)
      .then(() => navigate(`/songs`))
      .catch(error => console.log(error))
  }

  if (!song) {
    return <div>LOADING...</div>;
  }

  return (
    <article>
      <h1>SONG DETAILS</h1>
      <h2>{song.title}</h2>
      <p>Artist: {song.artist_name}</p>
      <p>Album: {song.album}</p>
      <p>Year: {song.year_of_release}</p>
      <div>
        <button className='back-button'>
          <Link to={`/songs`}>Song Library</Link>
        </button>
        <br />
        <button className='edit-button'>
          <Link to={`/songs/${id}/edit`}>Edit Song Info</Link>
        </button>
        <br />
        <button onClick={handleDelete}>DELETE SONG</button>
      </div>
    </article>
  );
}

export default SongDetails;