import { useState, useEffect } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

import img1 from "../../imports/23502b73-d3a9-45f0-af68-3d44412992b0.jpg";
import img2 from "../../imports/e6ca32d6-4eeb-423d-8802-5c85d9d18b89.jpg";
import img3 from "../../imports/IMG_3325.jpg";
import img4 from "../../imports/IMG_2457.jpg";
import img5 from "../../imports/IMG_1071.jpg";
import img6 from "../../imports/IMG_0264.jpg";
import img7 from "../../imports/IMG_1767.jpg";
import img8 from "../../imports/e5aad328-e8be-4789-838f-a2406f28a108.jpg";

const MEMORY_IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8
];

interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedImages = [...MEMORY_IMAGES, ...MEMORY_IMAGES];
    const shuffledCards = duplicatedImages
      .sort(() => Math.random() - 0.5)
      .map((imageUrl, index) => ({
        id: index,
        imageUrl,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      checkForMatch(newFlippedIndices);
    }
  };

  const checkForMatch = (indices: number[]) => {
    const [firstIndex, secondIndex] = indices;
    const isMatch = cards[firstIndex].imageUrl === cards[secondIndex].imageUrl;

    setTimeout(() => {
      const newCards = [...cards];
      if (isMatch) {
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        checkWin(newCards);
      } else {
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
      }
      setCards(newCards);
      setFlippedIndices([]);
    }, 1000);
  };

  const checkWin = (currentCards: Card[]) => {
    if (currentCards.every((card) => card.isMatched)) {
      setIsWon(true);
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#fb7185", "#fda4af"],
      });
    }
  };

  return (
    <section className="py-24 bg-pink-100 px-4 min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold text-rose-600 mb-4 font-serif">
          Un pequeño juego para ti
        </h2>
        <p className="text-rose-500 mb-4 text-lg">
          Encuentra los pares para revelar una sorpresa.
        </p>
        <div className="inline-block bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-rose-600 font-bold">Movimientos: {moves}</p>
        </div>
      </motion.div>

      {!isWon ? (
        <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-2xl w-full">
          {cards.map((card, index) => {
            return (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(index)}
                className={`aspect-square cursor-pointer rounded-2xl md:rounded-3xl flex items-center justify-center text-3xl transition-all duration-300 shadow-sm overflow-hidden ${
                  card.isFlipped || card.isMatched
                    ? "bg-white shadow-inner"
                    : "bg-rose-400 shadow-rose-300 hover:bg-rose-500"
                }`}
              >
                {(card.isFlipped || card.isMatched) ? (
                  <img src={card.imageUrl} alt="Memory card" className="w-full h-full object-cover" />
                ) : (
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-200/50" />
                )}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-lg text-center"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart className="w-20 h-20 text-rose-500 mx-auto mb-6 fill-rose-500 drop-shadow-md" />
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-bold text-rose-600 mb-6 font-serif">
            ¡Lo lograste! 🎉
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Quería hacer algo especial para sacarte una sonrisa. Eres la persona más maravillosa y me hace muy feliz compartir mis días contigo. ¡Te amo mucho mi mona! ❤️
          </p>
          <button
            onClick={initializeGame}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full transition-colors shadow-xl shadow-rose-200/50 text-lg"
          >
            Jugar de nuevo
          </button>
        </motion.div>
      )}
    </section>
  );
}
