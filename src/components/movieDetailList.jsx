const MovieDetailsList = ({ movie }) => {
  const details = [
    { label: 'Directors', value: movie.director },
    { label: 'Writers', value: movie.writer },
    { label: 'Actors', value: movie.actors },
    { label: 'Country', value: movie.country },
    { label: 'Language', value: movie.language },
    { label: 'Awards', value: movie.awards },
  ];

  return (
    <ul className="text-sm text-white space-y-2 movie-description">
      {details.map((item, index) => (
        <li key={index} className="py-[12px] border-b border-[#222C4F] flex">
          <span className="w-32 font-[700] text-[16px] opacity-[0.8]">{item.label}</span>
          <span className="opacity-[0.7] font-[400] text-[14px]">{item.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default MovieDetailsList;
