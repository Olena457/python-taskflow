export interface ImageCardType {
  id: number;
  url: string;
  alt: string;
}

export const IMAGES: ImageCardType[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800",
    alt: "Funny Cat 1",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=800",
    alt: "Funny Cat 2",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800",
    alt: "Funny Cat 3",
  },
];
