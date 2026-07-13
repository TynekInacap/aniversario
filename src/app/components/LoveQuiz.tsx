import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Star } from "lucide-react";

// Todas las preguntas (se mezclarán aleatoriamente)
const ALL_QUESTIONS = [
  {
    question: "¿Quién de los dos es más enojón/a pero a la vez el/la más consentido/a?",
    options: ["Yo (el novio)", "Definitivamente tú, mi monita", "Nadie, somos unos ángeles", "Nuestros papás"],
    correct: 1,
    errorHint: "¡Sabes perfectamente que eres tú, mi monita hermosa! 🤭❤️",
  },
  {
    question: "¿Cuál es el plan perfecto para un domingo juntos?",
    options: ["Salir a correr a las 6 AM", "Ir al supermercado", "Jugar videojuegos, comer milanesas y darnos mimos", "Limpiar la casa"],
    correct: 2,
    errorHint: "¡Milanesas y juegos es la respuesta ganadora! 🎮🥩",
  },
  {
    question: "¿Quién es más probable que se quede dormido viendo una película?",
    options: ["El perro", "Tú, a los 10 minutos", "Yo", "Ninguno, aguantamos despiertos"],
    correct: 1,
    errorHint: "Siempre te quedas dormidita a mi lado 😴❤️",
  },
  {
    question: "¿Qué es lo que nunca puede faltar cuando estamos juntos?",
    options: ["Peleas por el control de la tele", "Silencios incómodos", "Muchísimas risas y besos", "Estar aburridos"],
    correct: 2,
    errorHint: "Siempre la pasamos increíble juntos ✨",
  },
  {
    question: "¿Quién es el/la que siempre pide perdón primero (o trata de arreglarlo) después de una pelea tonta?",
    options: ["Tú, porque eres un sol", "Yo, porque no me gusta estar peleado contigo", "Nos hacemos la ley del hielo 3 días", "El árbitro"],
    correct: 1,
    errorHint: "¡Yo siempre busco arreglar las cosas porque te amo! 🥰",
  },
  {
    question: "Si tuviéramos que elegir una comida oficial de nuestra relación, sería...",
    options: ["Sopa de verduras", "Ensalada sin aderezo", "Milanesas con un buen cafecito", "Cereal con agua"],
    correct: 2,
    errorHint: "¡Nuestra combinación favorita! ☕🥩",
  },
  {
    question: "¿Quién tarda más en arreglarse para salir?",
    options: ["Yo, porque soy muy vanidoso", "Tú, mi monita, pero siempre quedas preciosa", "Nos arreglamos en 5 minutos", "Salimos en pijama"],
    correct: 1,
    errorHint: "Tardas un poquito, pero la espera siempre vale la pena 💄👗",
  },
  {
    question: "¿Qué es lo que más amo ver en ti?",
    options: ["Cuando te enojas", "Cuando me ignoras", "Esa sonrisa hermosa que me vuelve loco", "Cuando roncas"],
    correct: 2,
    errorHint: "Tu sonrisa es mi cosa favorita en el mundo 😍",
  },
];

// Frases románticas para el final (se selecciona una al azar)
const ENDING_PHRASES = [
  "Sabes perfectamente lo mucho que significas para mí, Anais. Gracias por ser tú, por aguantarme y por hacerme la persona más feliz. ¡Te amo mucho mi mona! ❤️",
  "Eres la casualidad más bonita que me ha pasado en la vida. Gracias por hacer que hasta un café o un videojuego sean mejores si estás tú. ¡Te amo muchísimo mi mona! ✨",
  "No importa cuántas milanesas coma, tú siempre serás mi cosa favorita en el mundo entero. Eres increíble. ¡Te amo mi mona! 🥩❤️",
  "Ni siquiera el GTA 6 se compara con la emoción que siento cada vez que te veo sonreír. ¡Te amo mucho mi mona! 🎮🥰",
  "Desde aquel primer beso en el río supe que eras súper especial. Gracias por tantos momentos mágicos a tu lado. ¡Te amo mi mona! 🌊❤️",
  "Viendo las estrellas contigo descubrí que mi universo entero eres tú. No te cambio por nada. ¡Te amo mucho mi mona! 🌌💖",
];

export function LoveQuiz() {
  const [questions, setQuestions] = useState(ALL_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [finalPhrase, setFinalPhrase] = useState("");

  // Iniciar y mezclar al cargar
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Mezclar preguntas
    const shuffledQuestions = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    
    // Seleccionar frase final aleatoria
    const randomPhrase = ENDING_PHRASES[Math.floor(Math.random() * ENDING_PHRASES.length)];
    setFinalPhrase(randomPhrase);
    
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setErrorMsg("");
  };

  const handleAnswer = (selectedIndex: number) => {
    const currentQ = questions[currentQuestionIndex];
    if (selectedIndex === currentQ.correct) {
      setErrorMsg("");
      const nextQ = currentQuestionIndex + 1;
      if (nextQ < questions.length) {
        setCurrentQuestionIndex(nextQ);
      } else {
        setShowResult(true);
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#f43f5e", "#fb7185", "#fda4af", "#fcd34d", "#a78bfa"],
        });
      }
    } else {
      setErrorMsg(currentQ.errorHint || "¡Intenta de nuevo mi amor! 😉");
    }
  };

  const currentQ = questions[currentQuestionIndex];

  return (
    <section className="relative py-24 bg-gradient-to-b from-rose-50 via-pink-100 to-rose-50 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Elementos flotantes de fondo para que se vea más bonito */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-200/40 pointer-events-none"
          initial={{ y: "120vh", x: `${Math.random() * 100}vw`, rotate: 0 }}
          animate={{ y: "-20vh", rotate: 360 }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
        >
          {i % 2 === 0 ? <Heart size={64} fill="currentColor" /> : <Sparkles size={48} />}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-12 max-w-xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4 font-serif drop-shadow-sm">
          Cuestionario de Amor 📝
        </h2>
        <p className="text-rose-500 text-lg md:text-xl font-medium bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full inline-block">
          Responde estas preguntitas para desbloquear un mensaje especial.
        </p>
      </motion.div>

      <div className="relative z-10 max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!showResult && currentQ ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-2xl border border-white/50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </h3>
                <div className="flex gap-1 text-rose-400">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                    >
                      <Star size={20} fill="currentColor" className={i === 0 ? "text-yellow-400" : ""} />
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-xl md:text-2xl text-rose-600 mb-8 text-center font-bold leading-tight">
                {currentQ.question}
              </p>

              <div className="grid gap-4">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left px-6 py-4 rounded-2xl border-2 border-rose-100 bg-white/50 hover:border-rose-400 hover:bg-rose-50 hover:shadow-lg hover:shadow-rose-100/50 transition-all text-gray-700 font-bold text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-rose-200"
                  >
                    <span className="inline-block w-8 text-rose-400 font-serif italic">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </motion.button>
                ))}
              </div>
              
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 text-red-500 rounded-xl font-bold text-center border border-red-100 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 animate-pulse" />
                  {errorMsg}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-gradient-to-br from-rose-500 to-pink-600 p-8 md:p-12 rounded-[3rem] shadow-2xl text-center text-white border-4 border-white/20 relative overflow-hidden"
            >
              {/* Decoración dentro de la tarjeta */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 text-white/10">
                <Heart size={200} fill="currentColor" />
              </div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 text-white/10">
                <Sparkles size={150} fill="currentColor" />
              </div>

              <motion.div 
                className="relative z-10"
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Heart className="w-20 h-20 mx-auto mb-6 fill-white drop-shadow-lg" />
              </motion.div>
              
              <h3 className="relative z-10 text-4xl md:text-5xl font-bold mb-6 font-serif drop-shadow-md">
                ¡Aprobaste con excelencia! 💯
              </h3>
              
              <p className="relative z-10 text-xl md:text-2xl mb-10 leading-relaxed font-medium bg-black/10 p-6 rounded-3xl backdrop-blur-sm border border-white/20">
                {finalPhrase}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewGame}
                className="relative z-10 bg-white text-rose-600 hover:bg-rose-50 hover:shadow-xl hover:shadow-white/20 font-bold py-4 px-10 rounded-full transition-all text-xl"
              >
                Volver a jugar 💖
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
