import { useState } from 'react';
import voicetotext from '../assets/images/microphone 1.svg';

const VoiceInput = ({ setQuery }) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.start();
  };

  return (
    <div className="flex items-center gap-[8px]">
      <img
        src={voicetotext}
        alt="microphone-icon"
        className="cursor-pointer"
        onClick={handleVoiceInput}
      />
      {isListening && (
        <span className="text-white text-[16px] pr-[10px] blink">
          Listening...
        </span>
      )}
    </div>
  );
};

export default VoiceInput;
