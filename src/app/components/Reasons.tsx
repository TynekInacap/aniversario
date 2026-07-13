import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

const REASONS = [
  {
    title: "Tu Sonrisa",
    desc: "Ilumina mi día entero, sin importar lo gris que parezca.",
    color: "bg-rose-100 text-rose-800"
  },
  {
    title: "Cómo me cuidas",
    desc: "Siempre estás ahí para mí, demostrándome tu amor en los detalles.",
    color: "bg-pink-100 text-pink-800"
  },
  {
    title: "Nuestras Risas",
    desc: "Me encanta que tengamos el mismo sentido del humor. Nadie me hace reír como tú.",
    color: "bg-purple-100 text-purple-800"
  },
  {
    title: "Mi compañera de aventuras",
    desc: "Desde ir por un café o unas milanesas, hasta quedarnos viendo las estrellas. Todo es mejor a tu lado. ✨",
    color: "bg-fuchsia-100 text-fuchsia-800"
  },
  {
    title: "Tus Enojitos",
    desc: "Sí, eres media enojona mi monita, pero hasta cuando te enojas te ves preciosa.",
    color: "bg-red-100 text-red-800"
  },
  {
    title: "Nuestra conexión",
    desc: "Siento que puedo ser yo mismo contigo al 100%. Eres mi lugar seguro.",
    color: "bg-orange-100 text-orange-800"
  }
];

export function Reasons() {
  return (
    <section className="py-24 bg-white px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <Sparkles className="text-rose-400 w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">
            6 Razones por las que te amo
          </h2>
          <p className="text-xl text-rose-500 font-medium">
            (Aunque en realidad tengo millones más)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
              className={`${reason.color} p-8 rounded-3xl shadow-lg relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute -right-4 -top-4 opacity-20 group-hover:scale-150 transition-transform duration-500">
                <Heart size={100} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif relative z-10">
                {reason.title}
              </h3>
              <p className="text-lg font-medium opacity-90 relative z-10 leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
