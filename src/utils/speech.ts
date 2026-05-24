export const speak = (text: string) => {
  if (!('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  // Using Arabic standard
  utterance.lang = 'ar-SA'; 
  // Slightly slower & higher pitch for kids
  utterance.rate = 0.85; 
  utterance.pitch = 1.1; 
  
  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
