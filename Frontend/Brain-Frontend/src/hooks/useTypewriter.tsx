import { useState, useEffect } from "react";

const phrases = [
  "access it",
  "store it",
  "remember it",
  "organize it",
  "share it",
];

export function useTypewriter(speed = 80, deleteSpeed = 40, pause = 1500) {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setTypedText(current.slice(0, typedText.length + 1));

        if (typedText.length + 1 === current.length) {
          // Finished typing — pause then start deleting
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // Deleting
        setTypedText(current.slice(0, typedText.length - 1));

        if (typedText.length - 1 === 0) {
          // Finished deleting — move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  return typedText;
}