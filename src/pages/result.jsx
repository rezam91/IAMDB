import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import backSignPath from '../assets/images/angle-left 1.png' 
import clockPath from '../assets/images/clock-two 1.png'
import { useContext } from 'react'
import { UserContext } from '../App'
import LikeButton from '../components/likeButton.jsx'
import RatingCircle from '../components/ratingCircle.jsx'
import LoadingSpinner from '../components/loading.jsx'
import MovieDetailsList from '../components/movieDetailList.jsx'
import HomePath from '../assets/images/home.png'
import OtherRatings from '../components/otherRatings.jsx'

const Result = () => {
  const { likedMovies, toggleLike } = useContext(UserContext)
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://moviesapi.codingfront.dev/api/v1/movies/${id}`)
        const data = await res.json()
        setMovie(data)
      } catch (err) {
        console.error('Failed to fetch movie details:', err)
      }
    }

    if (id) fetchMovie()
  }, [id])

  if (!movie) return <LoadingSpinner />
  const handleGenreClick = (genre) => {
    navigate(`/search/genre/${genre}/1`)
  }
  return (
    <>  
      <div className="absolute w-[1280px] h-[380px] top-0 mx-[-180px] overflow-hidden z-[-1] poster-box">
        {/* Background image */}
        <img src={movie.images} alt={movie.images} className="absolute top-0 left-0 w-full h-full object-cover z-[-2] poster"/>
        <div className="absolute z-[-2] w-full h-[380px]" style={{ background: `linear-gradient(to bottom,rgba(7, 13, 35, 0) 0%,rgba(7, 13, 35, 0.7) 70%,rgba(7, 13, 35, 0.9) 90%,#070D23 100%)`}}></div>
      </div>
      <div className='flex justify-between'>
        <div onClick={() => navigate(-1)} className='p-[10px] w-fit bg-[#222C4F] rounded-full cursor-pointer z-20 hover:bg-[#1a223d]'>
          <img src={backSignPath} alt="" width='20px' />
        </div>
        <div onClick={() => navigate('/')} className='p-[10px] bg-[#222C4F] rounded-full cursor-pointer hover:bg-[#1a223d]'>
          <img src={HomePath} alt="home-sign" width='20px' />
        </div>
      </div>
      {/* movie description */}
      <div className="mt-[100px] flex gap-[70px] text-white description">
        <div className='left-side w-[208px] flex-shrink-0'>
          <img src={movie.poster} alt={movie.title} className="w-[208px] h-auto rounded-[18px] object-cover movie-art"/>
          <div className='rate-box'>
            <div className='flex items-center gap-[18px] mt-[30px] circle-box'>
              <RatingCircle rating={movie.imdb_rating} />
              <div className='flex flex-col'>
                <span className='text-[16px] font-[700] opacity-[0.8]'>{movie.imdb_votes}</span>
                <span className='text-[14px] font-[400] opacity-[0.6]'>ratings on IMDB</span>
              </div>
            </div>

            {/* other ratings */}
            <OtherRatings ratings={movie.ratings} />
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className='flex justify-between items-center'>
              <h1 className="text-[48px] font-[700] mx-0 my-0">{movie.title}</h1>
              <div className='like-desktop'>
                <LikeButton movieId={movie.id} />
              </div>
            </div>
            {/* <p className="opacity-[0.4] mt-0 text-[12px] font-[300]">{movie.genres?.join(', ')}</p> */}
            <div className="flex flex-wrap gap-[6px] mb-[10px] text-[12px] text-white opacity-[0.4] font-[300]">
              {movie.genres?.map((genre, index) => (
                <span key={index} onClick={(e) => {handleGenreClick(genre)}} className="cursor-pointer hover:opacity-[0.7] transition-opacity hover:underline">{genre}</span>
              ))}
            </div>
            <p className='my-[18px] opacity-[0.6] leading-[24px] text-[14px] font-[400] text-justify'>{movie.plot}</p>
            <div className='flex gap-[12px] font-[400] text-[12px]'>
              <span className='px-[12px] py-[6px] rounded-[8px] bg-[#222C4F]'>{movie.rated}</span>
              <span className='px-[12px] py-[6px] rounded-[8px] bg-[#222C4F]'>{movie.year}</span>
              <span className='px-[12px] py-[6px] rounded-[8px] bg-[#222C4F] flex items-center gap-[6px]'><img src={clockPath} alt="clock" width="12px" />{movie.runtime}</span>
            </div>
            <h2 className='mt-[18px] text-[28px] font-[700] leading-[50px] detail-p'>Details</h2>
            <MovieDetailsList movie={movie} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-[12.5px] fav-button hidden w-[406px]">
        <button onClick={() => toggleLike(movie.id)}
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

export default Result