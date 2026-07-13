import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 to-rose-50">
      {/* Floating hearts background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 opacity-50"
          initial={{
            y: "100vh",
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: "-10vh",
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          <Heart fill="currentColor" size={48} />
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-rose-600 mb-6 font-serif"
        >
          Para Anais, mi persona favorita ❤️
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-rose-500 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Hice este pequeño rincón en internet solo para ti, mi mona, porque te mereces
          cosas lindas. Desliza hacia abajo para ver más.
        </motion.p>
      </div>
    </section>
  );
}
