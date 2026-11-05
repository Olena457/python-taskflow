"use client";

import Image from "next/image";

interface ImageCardProps {
  url: string;
  alt: string;
  onClick: () => void;
}

export default function ImageCard({ url, alt, onClick }: ImageCardProps) {
  return (
    <button
      onClick={onClick}
      className="aspect-square relative rounded-2xl overflow-hidden border border-border shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-pointer w-full"
    >
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
        Open
      </div>
    </button>
  );
}
