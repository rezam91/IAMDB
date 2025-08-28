import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import heartIdle from '../assets/images/State=Idle.png'
import heartHover from '../assets/images/State=Hover.png'
import heartLiked from '../assets/images/State=Liked.png'
import { useContext } from 'react';
import { UserContext } from '../App';

const Result = () => {
  const { likedMovies, toggleLike } = useContext(UserContext);
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://moviesapi.codingfront.dev/api/v1/movies/${id}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-white text-center mt-10">Loading...</div>;

  // Calculate rating circle fill
  const rating = parseFloat(movie.imdb_rating);
  const circleDegree = (rating / 10) * 360;

  // Filter and format ratings
  const filteredRatings = (() => {
    try {
      const ratings = JSON.parse(movie.ratings);
      return ratings
        .filter(rating =>
          rating.Source === "Rotten Tomatoes" || rating.Source === "Metacritic"
        )
        .map((rating, index) => {
          const source = rating.Source;
          const value = rating.Value;

          if (source === "Rotten Tomatoes") {
            return <div key={index}>{value} on Rotten Tomatoes</div>;
          }
          if (source === "Metacritic") {
            return <div key={index}>{value} on Metacritic</div>;
          }

          return null;
        });
    } catch (err) {
      return <div className="text-red-400">Ratings unavailable</div>;
    }
  })();

  return (
    <>  
      <div className='text-white mb-[100px]'>Back</div>
      <div className="flex gap-6 p-6 text-white">
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-[200px] h-[300px] object-cover rounded-lg"
          />

          <div className='flex'>
            {/* Rating Circle */}
            <div className="relative w-[80px] h-[80px] mt-6">
              <svg className="absolute top-0 left-0 w-full h-full">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#334155"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#facc15"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="220"
                  strokeDashoffset={220 - (circleDegree / 360) * 220}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-yellow-400 font-bold text-xl">
                {movie.imdb_rating}
              </div>
            </div>
            <div className='flex flex-col'>
              <span>{movie.imdb_votes}</span>
              <span>ratings on IMDB</span>
            </div>
          </div>

          {/* Ratings Output */}
          <div className="mt-4 space-y-2 text-white text-lg font-semibold">
            {filteredRatings}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className='flex justify-between'>

              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <div
                className="relative w-[24px] h-[24px] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // prevent accidental navigation
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
            <p className="text-gray-300 mb-1">{movie.genres?.join(', ')}</p>
            <p>{movie.plot}</p>
            <div>
              <span>{movie.rated}</span>
              <span>{movie.year}</span>
              <span>{movie.runtime}</span>
            </div>
            <h2>Details</h2>
            <ul className="text-sm text-white space-y-2">
              <li className="flex">
                <span className="w-32 font-semibold text-gray-300">Directors</span>
                <span>{movie.director}</span>
              </li>
              <li className="flex">
                <span className="w-32 font-semibold text-gray-300">Writers</span>
                <span>{movie.writer}</span>
              </li>
              <li className="flex">
                <span className="w-32 font-semibold text-gray-300">Actors</span>
                <span>{movie.actors}</span>
              </li>
              <li className="flex">
                <span className="w-32 font-semibold text-gray-300">Country</span>
                <span>{movie.country}</span>
              </li>
              <li className="flex">
                <span className="w-32 font-semibold text-gray-300">Language</span>
                <span>{movie.language}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;