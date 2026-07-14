import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

const SCRAMBLE_LEVELS = [
  {
    word: "MONITOS",
    hint: "Es como nos decimos",
    letters: ["O", "N", "M", "I", "S", "O", "T"],
  },
  {
    word: "SONRISA",
    hint: "Lo que más amo ver en tu rostro cada día.",
    letters: ["S", "O", "N", "R", "I", "S", "A"],
  },
  {
    word: "MIAMOR",
    hint: "Dos palabras que definen todo lo que siento por ti.",
    letters: ["A", "M", "I", "O", "R", "M"],
  },
];

export function LoveScramble() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentLevel = SCRAMBLE_LEVELS[levelIndex];
  const word = currentLevel.word;

  useEffect(() => {
    resetLevel();
  }, [levelIndex]);

  const resetLevel = () => {
    setSelectedIds([]);
    setSelectedLetters([]);
    setFeedback("");
    setIsSolved(false);
  };

  const handleLetterClick = (index: number) => {
    if (isSolved || selectedIds.includes(index)) {
      return;
    }

    const nextLetters = [...selectedLetters, currentLevel.letters[index]];
    setSelectedLetters(nextLetters);
    setSelectedIds([...selectedIds, index]);

    if (nextLetters.length === word.length) {
      checkAnswer(nextLetters.join(""));
    }
  };

  const removeLastLetter = () => {
    if (isSolved || selectedLetters.length === 0) {
      return;
    }

    setSelectedLetters(selectedLetters.slice(0, -1));
    setSelectedIds(selectedIds.slice(0, -1));
    setFeedback("");
  };

  const checkAnswer = (guess: string) => {
    if (guess === word) {
      setIsSolved(true);
      setFeedback("¡Perfecto! Has descifrado la palabra.");
    } else {
      setFeedback("No coincide. Intenta otra vez.");
      setTimeout(() => {
        resetLevel();
      }, 900);
    }
  };

  const nextLevel = () => {
    const nextIndex = levelIndex + 1;
    if (nextIndex < SCRAMBLE_LEVELS.length) {
      setLevelIndex(nextIndex);
    } else {
      setCompleted(true);
    }
  };

  const restartGame = () => {
    setLevelIndex(0);
    setCompleted(false);
    resetLevel();
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-rose-50 via-pink-50 to-white px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-12 max-w-3xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4 font-serif">
          Juego de palabras ✨
        </h2>
        <p className="text-rose-500 text-lg md:text-xl font-medium bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full inline-block">
          Desordena las letras y arma la palabra correcta para descubrir el mensaje.
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[2rem] shadow-2xl p-8 md:p-10">
          {completed ? (
            <div className="text-center">
              <Sparkles className="mx-auto mb-6 w-16 h-16 text-rose-400" />
              <h3 className="text-3xl md:text-4xl font-bold text-rose-600 mb-4">
                ¡Juego completado! 🎉
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Lo lograste, mi amor. Cada palabra te recuerda lo especial que eres para mí.
              </p>
              <button
                onClick={restartGame}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full transition-colors shadow-lg"
              >
                Volver a jugar
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <p className="text-lg text-rose-600 font-semibold mb-3">
                  Pista: {currentLevel.hint}
                </p>
                <div className="inline-flex gap-3 flex-wrap justify-center items-center px-4 py-3 bg-rose-50 rounded-3xl border border-rose-100 shadow-sm">
                  {Array.from({ length: word.length }).map((_, index) => (
                    <span
                      key={index}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-3xl bg-white flex items-center justify-center text-xl font-bold text-rose-600 border border-rose-100"
                    >
                      {selectedLetters[index] || "_"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {currentLevel.letters.map((letter, index) => (
                  <motion.button
                    key={`${letter}-${index}`}
                    whileHover={{ scale: selectedIds.includes(index) ? 1 : 1.04 }}
                    whileTap={{ scale: selectedIds.includes(index) ? 1 : 0.97 }}
                    onClick={() => handleLetterClick(index)}
                    disabled={selectedIds.includes(index) || isSolved}
                    className={`rounded-3xl py-5 text-2xl font-bold transition-all border-2 ${
                      selectedIds.includes(index)
                        ? "border-rose-200 bg-rose-100 text-rose-400 cursor-not-allowed"
                        : "border-rose-300 bg-white text-rose-600 hover:border-rose-400 hover:bg-rose-50"
                    }`}
                  >
                    {letter}
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <button
                  onClick={removeLastLetter}
                  disabled={selectedLetters.length === 0 || isSolved}
                  className="px-6 py-3 rounded-full border border-rose-200 bg-white text-rose-600 font-semibold hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Borrar letra
                </button>
                <button
                  onClick={resetLevel}
                  className="px-6 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600"
                >
                  Reiniciar palabra
                </button>
              </div>

              <p className="min-h-[1.5rem] text-center text-lg font-semibold text-rose-600 mb-6">
                {feedback}
              </p>

              {isSolved && (
                <div className="text-center">
                  <button
                    onClick={nextLevel}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full transition-colors shadow-lg"
                  >
                    {levelIndex + 1 < SCRAMBLE_LEVELS.length
                      ? "Siguiente palabra"
                      : "Ver mensaje final"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
