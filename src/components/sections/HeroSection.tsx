import { motion } from "framer-motion";
import { ArrowRight, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/3d/HeroScene";

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted"
    >
      {/* 3D Scene Background */}
      <HeroScene />

      {/* Content Overlay */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 bg-fresh/20 text-foreground px-4 py-2 rounded-full mb-6"
            >
              <Coffee size={18} className="text-fresh" />
              <span className="text-sm font-medium">Welcome to Feelfresh</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
              Start Your Day with{" "}
              <span className="text-gradient">Happiness</span>{" "}
              <br className="hidden md:block" />& Good Energy
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto"
            >
              Experience the freshness of morning at our cozy café in Faisalabad. 
              Artisanal coffee, fresh pastries, and positive vibes await you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => scrollToSection("#menu")}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 group"
              >
                View Menu
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button
                onClick={() => scrollToSection("#contact")}
                size="lg"
                variant="outline"
                className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-terracotta-foreground rounded-full px-8"
              >
                Order Online
              </Button>
            </motion.div>
          </motion.div>

          {/* Signature Items Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto"
          >
            {[
              { name: "Brownie Cake", emoji: "🍫" },
              { name: "Coffee Combo", emoji: "☕" },
              { name: "Breakfast Bowl", emoji: "🥗" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass rounded-xl p-4 text-center cursor-pointer"
              >
                <span className="text-2xl mb-2 block">{item.emoji}</span>
                <span className="text-xs font-medium text-foreground/70">{item.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ["20%", "60%", "20%"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-foreground/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
