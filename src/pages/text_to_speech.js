import React, { useState, useEffect } from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import styles from "./style.js";

const TextToSpeech = ({ text }) => {
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    synth.speak(utterance);
  };

  return (
    <div>
      <CampaignIcon style={styles.speech} onClick={handlePlay} />
    </div>
  );
};

export default TextToSpeech;
