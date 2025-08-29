import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import searchpath from '../assets/images/search 1.svg';
import backSignPath from '../assets/images/angle-left 1.png' 
import voicetotext from '../assets/images/microphone 1.svg';
import starPath from '../assets/images/star 1.png'
import heartIdle from '../assets/images/State=Idle.png'
import heartHover from '../assets/images/State=Hover.png'
import heartLiked from '../assets/images/State=Liked.png'
import { useContext } from 'react';
import { UserContext } from '../App';



const Search = () => {
  const { likedMovies, toggleLike } = useContext(UserContext);
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
      <div className='relative flex'>
        <div onClick={() => navigate(-1)} className='p-[10px] w-fit bg-[#222C4F] rounded-full cursor-pointer'>
          <img src={backSignPath} alt="" width='20px' />
        </div>
        <div className='text-white grow flex flex-col'>
          <span className='mx-auto p-0text-[18px] leading-[0.9] font-[700]'>Result</span>
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
        <ul className="flex flex-col gap-[20px] list-none pl-0 search-ul">
          {movies.map((movie) => (
            <li
              key={movie.id}
              onClick={() => navigate(`/result?id=${movie.id}`)}
              className="border-b border-[#222C4F] mb-[20px] flex pb-[20px] gap-[20px] text-white cursor-pointer rounded-[18px]"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-[137px] h-[137px] object-cover rounded-[18px] search-movie-image"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className='flex justify-between'>
                    <h3 className="text-[28px] font-[700] mt-[10px] mb-0 search-movie-title">{movie.title}</h3>
                    <div
                      className="relative w-[24px] h-[24px] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent triggering navigation
                        toggleLike(movie.id);
                      }}
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector('img');
                        if (!likedMovies.includes(movie.id)) img.src = heartHover;
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector('img');
                        if (!likedMovies.includes(movie.id)) img.src = heartIdle;
                      }}
                    >
                      <img
                        src={likedMovies.includes(movie.id) ? heartLiked : heartIdle}
                        alt="heart-icon"
                        width="24px"
                      />
                    </div>

                  </div>
                  <p className="text-[12px] text-white opacity-[0.4] mb-[10px] font-[300]">
                    {movie.genres?.join(', ')}
                  </p>
                  <div className="flex gap-[12px] flex-wrap items-center text-[18px] text-white opacity-[0.8]">
                    {movie.year}
                    <div className='bg-[#222C4F] w-[6px] h-[6px] rounded-full'></div>
                    {movie.country}
                    <div className='bg-[#222C4F] w-[6px] h-[6px] rounded-full'></div>
                    <div className='flex items-center gap-[6px]'>
                      <img src={starPath} alt="star-icon" width="14px" />
                      {movie.imdb_rating}
                    </div>
                  </div>
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
