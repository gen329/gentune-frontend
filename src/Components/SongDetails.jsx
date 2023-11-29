import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
const KEY = import.meta.env.API_KEY
const API = import.meta.env.VITE_API_URL

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

  useEffect(() => {
    const fetchYouTubeThumbnails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${KEY}&part=snippet&q=${song.title}&maxResults=5&type=video`
        );
          console.log(`${KEY}`)
        if (!response.ok) {
          throw new Error('Failed to fetch YouTube videos');
        }

        const data = await response.json();
        console.log('Youtube API response', data)
        const thumbnails = data.items.map((item) => item.snippet.thumbnails.default.url);
        setVideoThumbnails(thumbnails);
      } catch (error) {
        console.error('YouTube API error', error);
      }
    };

    if (song) {
      fetchYouTubeThumbnails();
    }
  }, [song, `${KEY}`]);


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
    
    <article className='songInfo'>
      <h1 className='h1'>SONG DETAILS</h1>
      <h2 className='song-title'>Title: {song.title}</h2>
      <p className='song-artist'> Artist: {song.artist_name}</p>
      <p className='song-album'>Album: {song.album}</p>
      <p className='song-year'>Year: {song.year_of_release}</p>
      <div className='mt-2'>
        <button className="border border-black rounded-sm px-8 py-2 mb-2">
          <Link to={`/songs`} >Song Library</Link>
        </button>
        <br />
        <button className="border border-black rounded-sm px-8 py-2 mb-2">
          <Link to={`/songs/${id}/edit`} className='details-link'>Edit Song Info</Link>
        </button>
        <br />
        <button onClick={handleDelete} className="border border-black rounded-sm px-8 py-2 mb-2">DELETE SONG</button>
      </div>
    </article>
  );
}

export default SongDetails;