import { motion } from "framer-motion";
import { Heart, Coffee, Sparkles } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop"
                alt="Cozy café interior with warm lighting"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-8 -right-4 lg:-right-8 bg-background rounded-2xl p-6 shadow-xl max-w-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-fresh/20 flex items-center justify-center">
                  <Heart className="text-terracotta" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Founded with Love</p>
                  <p className="text-sm text-muted-foreground">by Noorfatima</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Creating moments of joy and freshness every single day.
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-fresh font-medium uppercase tracking-wider text-sm">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-3 mb-6">
              Where Every Morning <br />
              <span className="text-gradient">Feels Fresh</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Welcome to Feelfresh, a cozy corner in the heart of Faisalabad where the 
                magic of morning meets the warmth of hospitality. Founded by Noorfatima 
                with a simple vision: to create a space where every guest starts their 
                day with happiness, calmness, and good energy.
              </p>
              <p>
                Our café is more than just a place for coffee—it's an experience. 
                From our signature Brownie Cake to our healthy Superfood Breakfast Bowls, 
                every item on our menu is crafted with love and the freshest ingredients.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { icon: Coffee, label: "Fresh Brewed", desc: "Daily" },
                { icon: Heart, label: "Made with", desc: "Love" },
                { icon: Sparkles, label: "Positive", desc: "Vibes" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-fresh/20 flex items-center justify-center mb-3">
                    <feature.icon className="text-fresh" size={24} />
                  </div>
                  <p className="font-semibold text-foreground">{feature.label}</p>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
