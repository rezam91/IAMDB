import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Genre from '../components/genre';
import searchpath from '../assets/images/search 1.svg';
import voicetotext from '../assets/images/microphone 1.svg';

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(query.trim())
    if (query.trim()) {
      navigate(`/search/${query}/page`);
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition(); // Chrome only
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };
    recognition.start();
  };

  return (
    <>
      <h1 className="text-white text-[140px] text-center font-black mt-[132px] home-title">
        IAMDb
      </h1>

      <form
        onSubmit={handleSearch}
        className="rounded-[16px] flex items-center bg-[#222C4F] px-[16px] py-[12px] gap-[4px] w-full opacity-80 form-mobile"
      >
        <img src={searchpath} alt="search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="bg-[#222C4F] text-white outline-none px-[2px] w-full"
        />
        <div className="border-l-[2px] border-black pl-[4px]">
          <img
            src={voicetotext}
            alt="microphone-icon"
            className="cursor-pointer"
            onClick={handleVoiceInput}
          />
        </div>
      </form>
      <Genre />
    </>
  );
};

export default Home;
