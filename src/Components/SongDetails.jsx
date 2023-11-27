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
    return <div className='loading-icon'>LOADING...</div>;
  }

  return (
    
    <article className='flex flex-col w-screen justify-center items-center'>
      <h1 className='h1'>SONG DETAILS</h1>
      <h2 className='song-title'>Title: {song.title}</h2>
      <p className='song-artist'> Artist: {song.artist_name}</p>
      <p className='song-album'>Album: {song.album}</p>
      <p className='song-year'>Year: {song.year_of_release}</p>
      <div className='mt-2'>
        <button className='border'>
          <Link to={`/songs`} className='details-link'>Song Library</Link>
        </button>
        <br />
        <button className='border'>
          <Link to={`/songs/${id}/edit`} className='details-link'>Edit Song Info</Link>
        </button>
        <br />
        <button onClick={handleDelete} className='delete-button'>DELETE SONG</button>
      </div>
    </article>
  );
}

export default SongDetails;