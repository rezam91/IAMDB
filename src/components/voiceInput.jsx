import voicetotext from '../assets/images/microphone 1.svg';

const VoiceInput = ({ setQuery }) => {
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
    <img
      src={voicetotext}
      alt="microphone-icon"
      className="cursor-pointer"
      onClick={handleVoiceInput}
    />
  );
};

export default VoiceInput;
