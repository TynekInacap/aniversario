import { motion } from "motion/react";
import { Music, Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { useState, useRef, useEffect } from "react";
// Importamos la canción que subiste
import songFile from "../../imports/One_Direction_-_Little_Things.mp3";
import vinylImg from "../../imports/IMG_1767.jpg";

export function OurSong() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Actualizar la barra de progreso
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  return (
    <section className="py-20 bg-rose-100/50 px-4">
      {/* Elemento de audio oculto */}
      <audio ref={audioRef} src={songFile} />

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Lado Izquierdo: El vinilo que gira */}
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl shadow-rose-300/40 border-8 border-gray-900 bg-gray-900 flex items-center justify-center overflow-hidden"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            {/* Detalles del vinilo (surcos) */}
            <div className="absolute inset-2 border border-gray-800 rounded-full" />
            <div className="absolute inset-6 border border-gray-800 rounded-full" />
            <div className="absolute inset-10 border border-gray-800 rounded-full" />
            
            {/* Centro del vinilo con una foto romántica */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-rose-400 overflow-hidden relative z-10">
              <img 
                src={vinylImg} 
                alt="Nuestra Canción" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-900 rounded-full" />
              </div>
            </div>
            
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 rotate-45" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -rotate-45" />
          </motion.div>
        </div>

        {/* Lado Derecho: Controles y Texto */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-rose-500 font-bold uppercase tracking-widest text-sm">
              <Music size={16} />
              <span>Nuestra Canción</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-serif">
              Little Things
            </h2>
            <p className="text-xl text-rose-500 mb-8 font-medium">
              One Direction
            </p>

            {/* Controles de Música */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-rose-50">
              {/* Barra de progreso real */}
              <div className="w-full h-2 bg-rose-100 rounded-full mb-6 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-rose-500 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Botones */}
              <div className="flex items-center justify-center gap-6 text-gray-700">
                <button className="hover:text-rose-500 transition-colors p-2">
                  <SkipBack size={24} />
                </button>
                
                <button 
                  onClick={togglePlay}
                  className="bg-rose-500 text-white p-4 rounded-full shadow-lg shadow-rose-300 hover:bg-rose-600 transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
                
                <button className="hover:text-rose-500 transition-colors p-2">
                  <SkipForward size={24} />
                </button>
              </div>
            </div>

            <p className="mt-8 text-gray-600 italic border-l-4 border-rose-300 pl-4">
              "Cada vez que escucho esta canción, me acuerdo de nuestro primer beso en el río y de lo afortunado que soy de tener a mi monita hermosa."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
