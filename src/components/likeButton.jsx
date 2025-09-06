import heartIdle from '../assets/images/State=Idle.png'
import heartHover from '../assets/images/State=Hover.png'
import heartLiked from '../assets/images/State=Liked.png'
import { useContext } from 'react'
import { UserContext } from '../App'

const LikeButton = ({ movieId }) => {
  const { likedMovies, toggleLike } = useContext(UserContext)
  const isLiked = likedMovies.includes(movieId)

  const handleClick = (e) => {
    e.stopPropagation()
    toggleLike(movieId)
  }

  return (
    <div className={`relative w-[24px] h-[24px] cursor-pointer group`} onClick={handleClick}>
      <img src={isLiked ? heartLiked : heartIdle} alt="heart-icon" width="24px" className={`${!isLiked ? 'group-hover:hidden' : ''}`}/>
      {!isLiked && (
        <img src={heartHover} alt="heart-hover" width="24px" className="absolute top-0 left-0 hidden group-hover:block"/>
      )}
    </div>
  )
}

export default LikeButton
