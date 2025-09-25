import React, { useState, useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, speed = 70, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const onCompleteRef = useRef(onComplete);

  // Always keep the ref updated with the latest callback from props
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Reset state for new text
    setDisplayedText('');
    setIsTyping(true);
    
    if (text) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false); // Stop typing, hide cursor
          // Call the callback via the ref to ensure the latest version is used
          // without making it a dependency of this effect.
          onCompleteRef.current?.();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }
    // This effect should only re-run when the text or speed changes, not the onComplete callback.
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      {isTyping && <span className="inline-block w-0.5 animate-pulse bg-slate-600 h-4 ml-1 align-middle"></span>}
    </span>
  );
};

export default AnimatedText;