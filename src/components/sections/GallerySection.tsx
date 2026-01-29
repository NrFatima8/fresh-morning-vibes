import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    alt: "Artisan coffee being poured",
    category: "drinks",
  },
  {
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop",
    alt: "Fresh croissants display",
    category: "pastries",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    alt: "Cozy café interior",
    category: "interior",
  },
  {
    src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop",
    alt: "Chocolate brownie cake",
    category: "desserts",
  },
  {
    src: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop",
    alt: "Superfood breakfast bowl",
    category: "healthy",
  },
  {
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    alt: "Pancake stack with berries",
    category: "breakfast",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
    alt: "Latte art",
    category: "drinks",
  },
  {
    src: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop",
    alt: "Iced coffee",
    category: "drinks",
  },
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const newIndex = direction === "prev" 
      ? (selectedImage - 1 + galleryImages.length) % galleryImages.length
      : (selectedImage + 1) % galleryImages.length;
    setSelectedImage(newIndex);
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-fresh font-medium uppercase tracking-wider text-sm">
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-3 mb-4">
            A Glimpse of <span className="text-gradient">Feelfresh</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From our delicious creations to our cozy ambiance, 
            here's a peek into the Feelfresh experience.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  index === 0 || index === 5 ? "h-full min-h-[300px] md:min-h-[400px]" : "h-48 md:h-56"
                }`}
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-background opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-background hover:bg-background/10"
              onClick={closeLightbox}
            >
              <X size={24} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-background hover:bg-background/10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
            >
              <ChevronLeft size={32} />
            </Button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-background hover:bg-background/10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
            >
              <ChevronRight size={32} />
            </Button>

            <div className="absolute bottom-4 text-background/70 text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
