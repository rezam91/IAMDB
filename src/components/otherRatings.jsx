const OtherRatings = ({ ratings }) => {
  try {
    const parsed = JSON.parse(ratings)
    const filtered = parsed.filter((r) => r.Source === 'Rotten Tomatoes' || r.Source === 'Metacritic')

    return (
      <div className="mt-[30px] text-[13px] font-[400] opacity-[0.4] leading-[24px] other-rating">
        {filtered.map((r, index) => (
          <div key={index}>
            {r.Value} on {r.Source}
          </div>
        ))}
      </div>
    )
  } catch (err) {
    return (
      <div className="mt-[30px] text-[13px] font-[400] opacity-[0.4] leading-[24px] other-rating text-red-400">
        Ratings unavailable
      </div>
    )
  }
}

export default OtherRatings
