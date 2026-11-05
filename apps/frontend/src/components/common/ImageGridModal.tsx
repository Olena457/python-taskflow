"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { IMAGES, ImageCardType } from "../../data/images";

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
    <div className="relative w-full max-w-5xl mx-auto min-h-screen flex items-center justify-center p-4">
      {/* 3x3 Grid  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 w-full border border-border rounded-3xl overflow-hidden shadow-xl bg-border">
        {IMAGES.map((img: ImageCardType) => (
          <button
            key={img.id}
            onClick={() => openModal(img.url)}
            className="aspect-square relative overflow-hidden group cursor-pointer w-full bg-card border-b border-r border-border transition-all duration-300"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-sm backdrop-blur-[2px]">
              View
            </div>
          </button>
        ))}
      </div>

      {/* Auth Card z-index */}
      {children && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto bg-card/95 backdrop-blur-md border border-border rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full flex flex-col justify-center items-center text-center">
            {children}
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && closeModal()}
        className="z-50 rounded-2xl p-0 backdrop:bg-transparent max-w-[90vw] max-h-[90vh] bg-transparent overflow-hidden border-none outline-none m-auto fixed inset-0"
      >
        <div className="relative flex justify-center items-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
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
                className="object-contain rounded-2xl shadow-2xl"
              />
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
