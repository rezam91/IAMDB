import heartIdle from '../assets/images/State=Idle.png';
import heartHover from '../assets/images/State=Hover.png';
import heartLiked from '../assets/images/State=Liked.png';
import { useContext } from 'react';
import { UserContext } from '../App';

const LikeButton = ({ movieId }) => {
  const { likedMovies, toggleLike } = useContext(UserContext);

  const handleMouseEnter = (e) => {
    const img = e.currentTarget.querySelector('img');
    if (!likedMovies.includes(movieId)) img.src = heartHover;
  };

  const handleMouseLeave = (e) => {
    const img = e.currentTarget.querySelector('img');
    if (!likedMovies.includes(movieId)) img.src = heartIdle;
  };

  const handleClick = (e) => {
    e.stopPropagation(); // prevent navigation
    toggleLike(movieId);
  };

  return (
    <div
      className="relative w-[24px] h-[24px] cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={likedMovies.includes(movieId) ? heartLiked : heartIdle}
        alt="heart-icon"
        width="24px"
      />
    </div>
  );
};

export default LikeButton;
