import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Heart } from "lucide-react";

export function TimeCounter() {
  const [timePassed, setTimePassed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Fecha de inicio: 13 de Diciembre de 2025
    const startDate = new Date("2025-12-13T00:00:00");

    const calculateTime = () => {
      const now = new Date();
      
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
        // Obtener los días del mes anterior
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      // Calcular horas, minutos y segundos (usando la diferencia total)
      const diffMs = now.getTime() - startDate.getTime();
      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor((totalSeconds / 3600) % 24);
      const minutes = Math.floor((totalSeconds / 60) % 60);
      const seconds = totalSeconds % 60;

      setTimePassed({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Años", value: timePassed.years },
    { label: "Meses", value: timePassed.months },
    { label: "Días", value: timePassed.days },
    { label: "Horas", value: timePassed.hours },
    { label: "Minutos", value: timePassed.minutes },
    { label: "Segundos", value: timePassed.seconds },
  ];

  return (
    <section className="py-24 bg-white px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-4 text-rose-500">
            <Clock size={32} />
            <Heart size={32} className="animate-pulse" fill="currentColor" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-6 font-serif">
            Nuestro Tiempo Juntos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Desde aquel mágico 13 de diciembre de 2025, cada segundo a tu lado ha sido un regalo. Y contando...
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", bounce: 0.5 }}
              className="bg-rose-50 border-2 border-rose-100 rounded-3xl p-6 shadow-lg shadow-rose-100/50 hover:bg-rose-100 transition-colors duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2 font-serif">
                {block.value}
              </div>
              <div className="text-sm md:text-base font-bold text-rose-400 uppercase tracking-wider">
                {block.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
