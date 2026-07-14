import { Hero } from "./components/Hero";
import { TimeCounter } from "./components/TimeCounter";
import { Gallery } from "./components/Gallery";
import { Reasons } from "./components/Reasons";
import { OurSong } from "./components/OurSong";
import { MemoryGame } from "./components/MemoryGame";
import { LoveQuiz } from "./components/LoveQuiz";
import { LoveScramble } from "./components/LoveScramble";
import { LoveLetter } from "./components/LoveLetter";

export default function App() {
  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      <Hero />
      <TimeCounter />
      <Gallery />
      <Reasons />
      <OurSong />
      <MemoryGame />
      <LoveQuiz />
      <LoveScramble />
      <LoveLetter />
    </div>
  );
}
