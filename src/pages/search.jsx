import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import searchpath from '../assets/images/search 1.svg';
import backSignPath from '../assets/images/angle-left 1.png' 
import voicetotext from '../assets/images/microphone 1.svg';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryInput, setQueryInput] = useState('');
  const navigate = useNavigate();

  const { query, genre, page } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      let url = '';

      if (genre) {
        url = `https://moviesapi.codingfront.dev/api/v1/genres/${genre}/movies?page=${page}`;
      } else if (query) {
        url = `https://moviesapi.codingfront.dev/api/v1/movies?q=${query}&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.data || []);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setMovies([]);
      }

      setLoading(false);
    };

    fetchMovies();
  }, [query, genre, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (queryInput.trim()) {
      navigate(`/search/${queryInput}/1`);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQueryInput(transcript);
    };
    recognition.start();
  };

  return (
    <>
      {/* Search Bar */}
      <div className='border border-red-300 relative flex'>
        <div className='p-[10px] w-fit bg-[#222C4F] rounded-full cursor-pointer'>
          <img src={backSignPath} alt="" width='20px' />
        </div>
        <div className='border border-green-300 text-white grow flex flex-col'>
          <span className='mx-auto p-0 border border-amber-300 text-[18px] leading-[0.9] font-[700]'>Result</span>
          <span className='mx-auto opacity-[0.4] text-[12px] font-[300] '>for {query ? `"${query}"` : `"${genre}"`}</span>
        </div>
        <div className='w-[40px] h-[40px]'>
        </div>
      </div>
      <form
        onSubmit={handleSearch}
        className="rounded-[16px] flex items-center bg-[#222C4F] px-4 py-2 gap-2 w-full mb-6 opacity-[0.8] mt-[32px]"
      >
        <img src={searchpath} alt="search-icon" width="24px" />
        <input
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          placeholder={query ? `${query}` : `${genre}`}
          className="bg-transparent text-white outline-none px-2 w-full"
        />
        <div className='border-l-[2px] border-black pl-[4px]'>
          <img
            src={voicetotext}
            alt="microphone-icon"
            width="24px"
            onClick={handleVoiceInput}
            className="cursor-pointer"
          />
        </div>
      </form>

      {/* Loading or No Results */}
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="text-white text-center text-lg font-semibold">No Result Found!</div>
      ) : (
        <ul className="flex flex-col gap-6 list-none pl-0">
          {movies.map((movie) => (
            <li
              key={movie.id}
              onClick={() => navigate(`/result?id=${movie.id}`)}
              className="flex items-start gap-4 bg-[#1e293b] p-4 rounded-lg text-white cursor-pointer hover:bg-[#334155]"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-[120px] h-[180px] object-cover rounded-md"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                  <p className="text-sm text-gray-300 mb-1">
                    {movie.genres?.join(', ')}
                  </p>
                  <p className="text-sm text-gray-400 mb-1">
                    {movie.year} • {movie.country}
                  </p>
                </div>
                <div className="mt-2 text-yellow-400 font-bold">
                  ⭐ {movie.imdb_rating}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
