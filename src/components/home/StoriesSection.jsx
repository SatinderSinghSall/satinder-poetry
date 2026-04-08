import { useEffect, useState } from "react";

export default function StoriesSection() {
  const words = ["Stories", "Poems"];

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        // typing
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 70);
      } else {
        // pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (charIndex > 0) {
        // deleting
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 35);
      } else {
        // switch word AFTER fully deleted
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section className="relative h-screen overflow-hidden bg-[#eaf4f4] flex items-center justify-center">
      {/* 🎨 BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(173,216,230,0.35), transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(144,238,144,0.25), transparent 50%),
            #eaf4f4
          `,
        }}
      />

      {/* 🐦 BIRD */}
      <img
        src="/assets/images/bird.jpg"
        alt="bird"
        className="
          absolute 
          left-[-30px] 
          top-[18%]
          w-[180px] sm:w-[300px] md:w-[420px] lg:w-[520px]
          mix-blend-multiply
          animate-bird
        "
      />

      {/* 🌿 LEAVES */}
      <img
        src="/assets/images/leaves.png"
        alt="leaves"
        className="
          absolute 
          right-[4%] 
          top-[18%]
          w-[140px] sm:w-[200px] md:w-[280px] lg:w-[360px]
          mix-blend-multiply
          animate-leaf
        "
      />

      {/* ✨ TEXT (NOW PERFECTLY CENTERED) */}
      <div className="relative z-10 text-center px-4">
        <h1
          className="
            font-[Playfair_Display]
            text-[56px] 
            sm:text-[110px] 
            md:text-[160px] 
            lg:text-[200px]
            leading-[0.85]
            tracking-tight
            text-black
        "
        >
          {text.slice(0, 2)}
          <span className="text-rose-400">{text.slice(2, 3)}</span>
          {text.slice(3)}
          <span className="animate-pulse">|</span>
        </h1>

        <p
          className="
            mt-2
            text-xs sm:text-base md:text-lg lg:text-xl
            text-black/70 italic
          "
        >
          open the door to a variety of experiences
        </p>
      </div>

      {/* 🪑🐶 BOTTOM */}
      <div
        className="
            absolute 
            bottom-[8%] sm:bottom-[5%]
            left-1/2 -translate-x-1/2 
            flex items-end 
            gap-3 sm:gap-6 md:gap-10
        "
      >
        <img
          src="/assets/images/chair.png"
          alt="chair"
          className="
            w-[140px]
            sm:w-[130px] md:w-[180px] lg:w-[220px]
            animate-chair
            "
        />

        <img
          src="/assets/images/dog.png"
          alt="dog"
          className="
            w-[140px]
            sm:w-[130px] md:w-[180px] lg:w-[220px]
            -ml-4 sm:-ml-6 md:-ml-10
            mix-blend-multiply
            "
        />
      </div>
    </section>
  );
}
