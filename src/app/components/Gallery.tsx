import { motion } from "motion/react";
import img1 from "../../imports/23502b73-d3a9-45f0-af68-3d44412992b0.jpg";
import img2 from "../../imports/e6ca32d6-4eeb-423d-8802-5c85d9d18b89.jpg";
import img3 from "../../imports/IMG_3325.jpg";
import img4 from "../../imports/IMG_2457.jpg";

const images = [
  img1,
  img2,
  img3,
  img4,
];

export function Gallery() {
  return (
    <section className="py-20 bg-rose-50 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-rose-600 mb-4 font-serif">
            Nuestros Momentos
          </h2>
          <p className="text-rose-500 text-lg">
            (Imagina que aquí están tus fotos favoritas de nosotros 🙈)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src={src}
                alt="Momento romántico"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
