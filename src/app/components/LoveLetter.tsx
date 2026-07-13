import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Heart, X } from "lucide-react";
import confetti from "canvas-confetti";

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#fb7185", "#fda4af"],
    });
  };

  return (
    <section className="py-24 bg-pink-100 px-4 min-h-[60vh] flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4 font-serif">
          Una Carta Para Ti 💌
        </h2>
        <p className="text-rose-500 text-lg font-medium">
          Toca el sobre para abrirlo...
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="cursor-pointer bg-white w-64 h-48 md:w-80 md:h-56 rounded-xl shadow-2xl relative flex items-center justify-center border-4 border-rose-200 group"
          >
            {/* Detalles del sobre */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full border-t-[100px] border-l-[160px] border-r-[160px] md:border-t-[120px] md:border-l-[200px] md:border-r-[200px] border-t-rose-100 border-l-transparent border-r-transparent border-b-transparent opacity-80" />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3 bg-white/80 p-4 rounded-full backdrop-blur-sm group-hover:bg-rose-50 transition-colors shadow-sm">
              <Mail className="w-12 h-12 text-rose-400" />
              <span className="font-bold text-rose-600 text-sm tracking-widest uppercase">
                Para Anais
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white max-w-2xl w-full p-8 md:p-12 rounded-3xl shadow-2xl relative border-2 border-rose-50"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <X size={24} />
            </button>
            
            <Heart className="w-12 h-12 text-rose-400 mb-6 mx-auto fill-rose-100" />
            
            <div className="font-serif text-gray-700 text-lg md:text-xl leading-relaxed space-y-6">
              <p>Hola mi monita,</p>
              
              <p>
                Te quería hacer esta pequeña carta virtual que nunca se perderá, para decirte lo mucho que te amo. 
                Quería dejar un pedacito de mis sentimientos por ti guardado aquí, donde puedas leerlo siempre que quieras o cuando necesites recordar lo importante que eres para mí.
              </p>

              <p>
                Desde aquel hermoso 13 de diciembre, mi vida se ha llenado de luz, de risas y de momentos inolvidables.
                Me encanta cada detalle nuestro: desde nuestras pláticas hasta tarde, nuestra pasión por jugar juntos, 
                hasta las cosas tan simples como tomar un buen café y comer tus milanesas favoritas. Todo es infinitamente mejor si es contigo.
              </p>

              <p>
                Y sí, a pesar de que a veces eres media enojona, ¡te amo muchísimo y no te cambiaría por nada del mundo! 
                Hasta cuando te enojas me pareces hermosa. Adoro todas tus facetas, tu sonrisa, tu mirada y esa forma 
                tan única que tienes de hacerme feliz sin siquiera intentarlo.
              </p>

              <p>
                Gracias por ser mi lugar seguro, mi compañera de aventuras y el amor de mi vida.
                Prometo seguir cuidándote, llenándote de besos, haciéndote reír y eligiéndote todos los días.
              </p>

              <p className="text-right font-bold text-rose-600 pt-6">
                Con todo mi amor,<br/>
                Para siempre tuyo. ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
