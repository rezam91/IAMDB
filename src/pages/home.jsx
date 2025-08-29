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
      <h1 className="border border-white text-white text-[140px] text-center font-black mt-[132px]">IAMDb</h1>
      <form
        onSubmit={handleSearch}
        className="rounded-[16px] flex items-center bg-[#222C4F] px-4 py-2 gap-2 w-full opacity-80"
      >
        <img src={searchpath} alt="search-icon" width="24px" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="bg-[#222C4F] text-white outline-none px-2 w-full"
        />
        <div className='border-l-[2px] border-black pl-[4px]'>
          <img
            src={voicetotext}
            alt="microphone-icon"
            width="24px"
            onClick={handleVoiceInput}
            className="cursor-pointer"
          />
        </div>
      </form>
      <Genre />
    </>
  );
};

export default Home;
