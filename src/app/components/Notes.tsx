import { motion } from "motion/react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const STORAGE_NOTES_KEY = "album_notes";

interface NoteAttachment {
  id: string;
  src: string;
  name: string;
  type: "image" | "video";
  isObjectUrl?: boolean;
}

interface Note {
  id: string;
  title: string;
  description: string;
  attachments: NoteAttachment[];
  createdAt: string;
}

function loadStorageNotes(): Note[] {
  try {
    const stored = localStorage.getItem(STORAGE_NOTES_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as Note[];
  } catch {
    return [];
  }
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("No se pudo leer el archivo"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}


export function NotesDialog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<NoteAttachment[]>([]);
  const [notes, setNotes] = useState<Note[]>(() => loadStorageNotes());
  const createdObjectUrls = [] as string[];

  useEffect(() => {
    localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleAttachmentUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: NoteAttachment[] = [];
    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith("video");
      if (isVideo) {
        // Use object URL for videos to avoid blocking the main thread converting to base64
        const url = URL.createObjectURL(file);
        createdObjectUrls.push(url);
        newAttachments.push({
          id: `${Date.now()}-${file.name}`,
          src: url,
          name: file.name,
          type: "video",
          isObjectUrl: true,
        });
      } else {
        const dataUrl = await readFileAsDataUrl(file);
        newAttachments.push({
          id: `${Date.now()}-${file.name}`,
          src: dataUrl,
          name: file.name,
          type: "image",
        });
      }
    }
    setAttachments(prev => [...prev, ...newAttachments]);
    event.target.value = "";
  };

  const handleAddNote = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    if (!trimmedTitle && !trimmedDescription && attachments.length === 0) return;

    setNotes(prev => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title: trimmedTitle || "Nota nueva",
        description: trimmedDescription,
        attachments,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setTitle("");
    setDescription("");
    setAttachments([]);
  };

  const handleRemoveNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  useEffect(() => {
    return () => {
      // Revoke any created object URLs to free memory
      try {
        for (const url of createdObjectUrls) {
          URL.revokeObjectURL(url);
        }
      } catch (e) {}
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">
          Ver notas
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[96vw] sm:max-w-[1400px] h-[96vh] overflow-hidden p-0 sm:p-6">
        <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-white via-rose-50 to-pink-50 shadow-2xl">
          <DialogHeader className="border-b border-rose-100 px-6 py-5">
            <DialogTitle className="text-3xl font-semibold text-rose-700">Notas privadas</DialogTitle>
            <DialogDescription className="text-sm text-rose-500">
              Crea notas con título, descripción y archivos de foto o video. El resto de la página quedará oculto mientras estés aquí.
            </DialogDescription>
          </DialogHeader>

          <div className="flex h-full flex-col overflow-hidden p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr] h-full">
              <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-rose-100 overflow-auto">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-rose-700">Título</label>
                    <input
                      value={title}
                      onChange={event => setTitle(event.target.value)}
                      placeholder="Ejemplo: Picnic en la playa"
                      className="mt-2 w-full rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-rose-700">Descripción</label>
                    <textarea
                      value={description}
                      onChange={event => setDescription(event.target.value)}
                      rows={5}
                      placeholder="Describe lo que quieres recordar..."
                      className="mt-2 w-full resize-none rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-rose-700">Fotos y videos</label>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <label className="inline-flex cursor-pointer rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 shadow-sm transition hover:bg-rose-50">
                        + Adjuntar archivos
                        <input
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleAttachmentUpload}
                          className="sr-only"
                        />
                      </label>
                      {attachments.length > 0 && (
                        <span className="text-sm text-rose-500">{attachments.length} archivo(s) listo(s) para agregar</span>
                      )}
                    </div>
                    {attachments.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {attachments.map(attachment => (
                          <div key={attachment.id} className="rounded-3xl border border-rose-100 bg-rose-50 p-3">
                            {attachment.type === "image" ? (
                              <img src={attachment.src} alt={attachment.name} className="h-40 w-full rounded-3xl object-cover" />
                            ) : (
                              <video
                                controls
                                src={attachment.src}
                                playsInline
                                preload="metadata"
                                onLoadedMetadata={(e) => {
                                  try {
                                    const v = e.currentTarget as HTMLVideoElement;
                                    v.muted = false;
                                    v.volume = 1;
                                  } catch (err) {}
                                }}
                                className="h-40 w-full rounded-3xl object-cover"
                              />
                            )}
                            <p className="mt-3 truncate text-sm font-medium text-rose-700">{attachment.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNote}
                    className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                  >
                    Guardar nota
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-6 overflow-hidden h-full">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-rose-100 overflow-auto h-full">
                  <h3 className="text-2xl font-semibold text-rose-700 mb-4">Tus notas guardadas</h3>
                  {notes.length === 0 ? (
                    <p className="text-sm text-rose-500">No hay notas todavía. Añade una para verla aquí.</p>
                  ) : (
                    <div className="space-y-4">
                      {notes.map(note => (
                        <div key={note.id} className="rounded-3xl border border-rose-100 bg-rose-50 p-4 shadow-sm">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-base font-semibold text-rose-700">{note.title}</h4>
                              <p className="mt-2 text-sm leading-6 text-rose-600 whitespace-pre-line">{note.description}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveNote(note.id)}
                              className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200"
                            >
                              Eliminar
                            </button>
                          </div>
                          {note.attachments.length > 0 && (
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                              {note.attachments.map(attachment => (
                                <div key={attachment.id} className="rounded-3xl overflow-hidden border border-rose-100 bg-white">
                                  {attachment.type === "image" ? (
                                    <img src={attachment.src} alt={attachment.name} className="h-44 w-full object-cover" />
                                  ) : (
                                    <video
                                      controls
                                      src={attachment.src}
                                      playsInline
                                      preload="metadata"
                                      onLoadedMetadata={(e) => {
                                        try {
                                          const v = e.currentTarget as HTMLVideoElement;
                                          v.muted = false;
                                          v.volume = 1;
                                        } catch (err) {}
                                      }}
                                      className="h-44 w-full object-cover"
                                    />
                                  )}
                                  <div className="p-3">
                                    <p className="truncate text-sm font-medium text-rose-700">{attachment.name}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="mt-4 text-xs text-rose-500">{new Date(note.createdAt).toLocaleString("es-CL", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
