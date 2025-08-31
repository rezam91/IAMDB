import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import backSignPath from '../assets/images/angle-left 1.png' 
import heartIdle from '../assets/images/State=Idle.png'
import heartHover from '../assets/images/State=Hover.png'
import heartLiked from '../assets/images/State=Liked.png'
import clockPath from '../assets/images/clock-two 1.png'
import { useContext } from 'react';
import { UserContext } from '../App';

const Result = () => {
  const { likedMovies, toggleLike } = useContext(UserContext);
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
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
      {/* <img src={movie.images} alt={movie.images} width="1280px" className='absolute mt-[-50px] mx-[-180px] z-[-1]' /> */}
      <div className="absolute w-[1280px] h-[380px] top-0 mx-[-180px] overflow-hidden z-[-1] poster-box">
        {/* Background image */}
        <img
          src={movie.images}
          alt={movie.images}
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2] poster"
        />
        {/* <div className="z-[-1] absolute w-full h-[380px] bg-gradient-to-b from-[#070D23]/0 via-[#070D23]/70 via-[#070D23]/90 to-[#070D23]"></div> */}
        <div
          className="absolute z-[-2] w-full h-[380px]"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(7, 13, 35, 0) 0%, 
              rgba(7, 13, 35, 0.7) 70%, 
              rgba(7, 13, 35, 0.9) 90%, 
              #070D23 100%)`
          }}
        ></div>
      </div>
      <div onClick={() => navigate(-1)} className='p-[10px] w-fit bg-[#222C4F] rounded-full cursor-pointer z-20'>
        <img src={backSignPath} alt="" width='20px' />
      </div>
      <div className="mt-[100px] flex gap-[70px] text-white description">
        <div className='left-side'>
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded-[18px] movie-art"
          />
          <div className='rate-box'>
            <div className='flex items-center gap-[18px] mt-[30px] circle-box'>
              {/* Rating Circle */}
              <div className="relative w-[80px] h-[80px]">
                <svg className="absolute top-0 left-0 w-full h-full">
                  {/* Empty background circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="#222C4F"
                    strokeWidth="6"
                    fill="none"
                  />
                  {/* Filled progress circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="#724CF9"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="220"
                    strokeDashoffset={220 - (circleDegree / 360) * 220}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                {/* Rating text */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-[800] text-[24px]">
                  {movie.imdb_rating}
                </div>
              </div>

              <div className='flex flex-col'>
                <span className='text-[16px] font-[700] opacity-[0.8]'>{movie.imdb_votes}</span>
                <span className='text-[14px] font-[400] opacity-[0.6]'>ratings on IMDB</span>
              </div>
            </div>

            {/* Ratings Output */}
            <div className="mt-[30px] text-[13px] font-[400] opacity-[0.4] leading-[24px] other-rating">
              {filteredRatings}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className='flex justify-between items-center'>
              <h1 className="text-[48px] font-[700] mx-0 my-0">{movie.title}</h1>
              <div
                className="relative w-[24px] h-[24px] cursor-pointer like-box"
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
            <p className="opacity-[0.4] mt-0 text-[12px] font-[300]">{movie.genres?.join(', ')}</p>
            <p className='my-[18px] opacity-[0.6] leading-[24px] text-[14px] font-[400] text-justify'>{movie.plot}</p>
            <div className='flex gap-[12px] font-[400] text-[12px]'>
              <span className='px-[12px] py-[6px] rounded-[8px] bg-[#222C4F]'>{movie.rated}</span>
              <span className='px-[12px] py-[6px] rounded-[8px] bg-[#222C4F]'>{movie.year}</span>
              <span className='px-[12px] py-[6px] rounded-[8px] bg-[#222C4F] flex items-center gap-[6px]'><img src={clockPath} alt="clock" width="12px" />{movie.runtime}</span>
            </div>
            <h2 className='mt-[18px] text-[28px] font-[700] leading-[50px] detail-p'>Details</h2>
            <ul className="text-sm text-white space-y-2 movie-description">
              <li className="py-[12px] border-b border-[#222C4F] flex">
                <span className="w-32 font-[700] text-[16px] opacity-[0.8]">Directors</span>
                <span className='opacity-[0.7] font-[400] text-[14px]'>{movie.director}</span>
              </li>
              <li className="py-[12px] border-b border-[#222C4F] flex">
                <span className="w-32 font-[700] text-[16px] opacity-[0.8]">Writers</span>
                <span className='opacity-[0.7] font-[400] text-[14px]'>{movie.writer}</span>
              </li>
              <li className="py-[12px] border-b border-[#222C4F] flex">
                <span className="w-32 font-[700] text-[16px] opacity-[0.8]">Actors</span>
                <span className='opacity-[0.7] font-[400] text-[14px]'>{movie.actors}</span>
              </li>
              <li className="py-[12px] border-b border-[#222C4F] flex">
                <span className="w-32 font-[700] text-[16px] opacity-[0.8]">Country</span>
                <span className='opacity-[0.7] font-[400] text-[14px]'>{movie.country}</span>
              </li>
              <li className="py-[12px] border-b border-[#222C4F] flex">
                <span className="w-32 font-[700] text-[16px] opacity-[0.8]">Language</span>
                <span className='opacity-[0.7] font-[400] text-[14px]'>{movie.language}</span>
              </li>
              <li className="py-[12px] border-b border-[#222C4F] flex">
                <span className="w-32 font-[700] text-[16px] opacity-[0.8]">Awards</span>
                <span className='opacity-[0.7] font-[400] text-[14px]'>{movie.awards}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[12.5px] fav-button hidden w-[406px]">
        <button
          onClick={() => toggleLike(movie.id)}
          className={`w-full px-[24px] py-[12px] text-white font-[400] rounded-[12px] transition-all duration-300 cursor-pointer ${
            likedMovies.includes(movie.id)
              ? 'bg-[#222C4F] hover:bg-[#1a223d]'
              : 'bg-[#724CF9] hover:bg-[#5a3bd1]'
          }`}
        >
          {likedMovies.includes(movie.id) ? 'Remove from Favorite' : 'Add to Favorite'}
        </button>
      </div>

    </>
  );
};

export default Result;