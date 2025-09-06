import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Genre from '../components/genre'
import searchpath from '../assets/images/search 1.svg'
import VoiceInput from '../components/voiceInput'

const Home = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) { //ke user khali type nakarde bashe
      navigate(`/search/${query}/1`)
    }
  };

  return (
    <>
      <h1 className="text-white text-[140px] text-center font-[900] mt-[132px] home-title">IAMDb</h1>

      <form onSubmit={handleSearch} className="rounded-[16px] flex items-center bg-[#222C4F] px-[16px] py-[12px] gap-[4px] w-full opacity-80 form-mobile">
        <img src={searchpath} alt="search-icon" />
        <input type="text" value={query} placeholder="Search movies..." onChange={(e) => setQuery(e.target.value)} className="bg-[#222C4F] text-white outline-none px-[2px] w-full"/>
        <div className="border-l-[2px] border-black pl-[4px]">
          <VoiceInput setQuery={setQuery} />
        </div>
      </form>
      <Genre />
    </>
  );
};

export default Home
