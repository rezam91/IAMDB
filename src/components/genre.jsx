import arrowSymbolPath from '../assets/images/angle-small-left 1.png'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const genres = [
  "Crime", "Drama", "Action", "Biography", "History", "Adventure", "Fantasy",
  "Western", "Comedy", "Sci-Fi", "Romance", "Mystery", "Family", "War",
  "Thriller", "Horror", "Music", "Animation", "Film-Noir", "Sport"
];

const Genre = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const initialGenres = genres.slice(0, 4);
  const displayedGenres = showAll ? genres : initialGenres;

  const handleGenreClick = (genre) => {
    navigate(`/search/genre/${genre}/1`);
  };

  return (
    <ul className="list-none pl-0 text-white text-[12px] font-normal flex items-center gap-[10px] flex-wrap mt-[32px] justify-center">
      {displayedGenres.map((genre, index) => (
        <li
          key={index}
          onClick={() => handleGenreClick(genre)}
          className="bg-[#222C4F] px-[12px] py-[6px] rounded-[8px] cursor-pointer text-[12px] opacity-[0.8]"
        >
          {genre}
        </li>
      ))}
      {!showAll && (
        <li
          onClick={() => setShowAll(true)}
          className="bg-[#222C4F] px-[12px] py-[6px] rounded-[8px] cursor-pointer text-[12px] opacity-[0.8]"
        >
          <div className='flex gap-[6px]'>Show More <img src={arrowSymbolPath} width='14px' alt="arrow" /></div>
        </li>
      )}
    </ul>
  );
};

export default Genre;
