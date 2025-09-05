const RatingCircle = ({ rating }) => {
  const circleDegree = (parseFloat(rating) / 10) * 360;

  return (
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
        {rating}
      </div>
    </div>
  );
};

export default RatingCircle;
