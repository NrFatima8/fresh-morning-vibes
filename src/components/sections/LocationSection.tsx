import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const LocationSection = () => {
  return (
    <section id="location" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-fresh font-medium uppercase tracking-wider text-sm">
              Visit Us
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-3 mb-6">
              Find Us in <span className="text-gradient">Faisalabad</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Located in the heart of Faisalabad, Feelfresh is your perfect 
              destination for a refreshing break. Whether you're starting your 
              day or need an afternoon pick-me-up, we're here for you.
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              <Card className="border-0 shadow-md bg-card">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-fresh/20 flex items-center justify-center">
                    <MapPin className="text-fresh" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground">Faisalabad, Punjab, Pakistan</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-card">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center">
                    <Clock className="text-terracotta" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Opening Hours</p>
                    <p className="text-muted-foreground">
                      Open Daily — Come visit us anytime!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-card">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center">
                    <Phone className="text-golden" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Contact</p>
                    <p className="text-muted-foreground">+92 3287873807</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109063.47252844095!2d73.0075073!3d31.4187354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269c5a84f5733%3A0x4c0b00ea9de51d63!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Feelfresh Café Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Overlay Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-foreground text-primary-foreground rounded-2xl p-6 shadow-xl"
            >
              <p className="text-2xl font-playfair font-bold">
                Feel<span className="text-fresh">fresh</span>
              </p>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Your daily dose of freshness
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
