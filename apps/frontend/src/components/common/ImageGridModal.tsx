"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { IMAGES } from '../../data/images';

interface ImageGridModalProps {
  children?: React.ReactNode;
}

export default function ImageGridModal({ children }: ImageGridModalProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = (url: string) => {
    setSelectedImg(url);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedImg(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
        <div className="aspect-square bg-card border border-border rounded-2xl p-6 shadow-md flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1">
          {children}
        </div>

        {/* Foto buttons */}
        {IMAGES.map((img) => (
          <button
            key={img.id}
            onClick={() => openModal(img.url)}
            className="aspect-square relative rounded-2xl overflow-hidden border border-border shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-pointer w-full"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
              Open
            </div>
          </button>
        ))}
      </div>

      {/* Modal window */}
      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && closeModal()}
        className="rounded-2xl p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm max-w-[90vw] max-h-[90vh] bg-transparent overflow-hidden shadow-2xl border-none outline-none"
      >
        <div className="relative flex justify-center items-center p-2">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {selectedImg && (
            <div className="relative w-[85vw] h-[85vh] flex items-center justify-center">
              <Image
                src={selectedImg}
                alt="Expanded view"
                fill
                sizes="85vw"
                className="object-contain rounded-2xl"
              />
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
