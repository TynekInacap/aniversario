import { motion } from "motion/react";
import { ChangeEvent, useEffect, useState } from "react";
import img1 from "../../imports/23502b73-d3a9-45f0-af68-3d44412992b0.jpg";
import img2 from "../../imports/e6ca32d6-4eeb-423d-8802-5c85d9d18b89.jpg";
import img3 from "../../imports/IMG_3325.jpg";
import img4 from "../../imports/IMG_2457.jpg";
import { NotesDialog } from "./Notes";

const STORAGE_PHOTOS_KEY = "album_photos";

interface Photo {
  id: string;
  src: string;
  name: string;
}

const defaultPhotos: Photo[] = [
  { id: "default-1", src: img1, name: "Recuerdo 1" },
  { id: "default-2", src: img2, name: "Recuerdo 2" },
  { id: "default-3", src: img3, name: "Recuerdo 3" },
  { id: "default-4", src: img4, name: "Recuerdo 4" },
];

function loadStoragePhotos(): Photo[] {
  try {
    const stored = localStorage.getItem(STORAGE_PHOTOS_KEY);
    if (!stored) return defaultPhotos;
    return JSON.parse(stored) as Photo[];
  } catch {
    return defaultPhotos;
  }
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("No se pudo leer la imagen"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>(() => loadStoragePhotos());

  useEffect(() => {
    localStorage.setItem(STORAGE_PHOTOS_KEY, JSON.stringify(photos));
  }, [photos]);

  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const uploads: Photo[] = [];
    for (const file of Array.from(files)) {
      const dataUrl = await readFileAsDataUrl(file);
      uploads.push({
        id: `${Date.now()}-${file.name}`,
        src: dataUrl,
        name: file.name,
      });
    }
    setPhotos(prev => [...prev, ...uploads]);
    event.target.value = "";
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };


  return (
    <section className="py-20 bg-rose-50 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-rose-600 mb-4 font-serif">
            Nuestros Momentos
          </h2>
          <p className="text-rose-500 text-lg">
            Guarda tus fotos favoritas y mantenlas siempre visibles en tu álbum especial.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-rose-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-rose-700">Álbum de Fotos</h3>
                  <p className="text-sm text-rose-500">Sube imágenes y mantenlas siempre visibles.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <NotesDialog />
                  <label className="inline-flex cursor-pointer rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm transition hover:bg-rose-100">
                    + Añadir fotos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {photos.map(photo => (
                  <div key={photo.id} className="group overflow-hidden rounded-3xl border border-rose-100 bg-rose-50 shadow-sm">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-rose-700 shadow hover:bg-white"
                        aria-label={"Eliminar foto " + photo.name}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-rose-700 truncate">{photo.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
