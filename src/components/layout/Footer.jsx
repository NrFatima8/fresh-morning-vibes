import { motion } from "framer-motion";
import { Instagram, Music2, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-playfair font-bold mb-4">
              Feel<span className="text-fresh">fresh</span>
            </h3>
            <p className="text-primary-foreground/70 leading-relaxed">
              Start your day with happiness and good energy. Experience the freshness of morning at our cozy café in Faisalabad.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Menu", "Specials", "Gallery", "Reviews"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                    className="text-primary-foreground/70 hover:text-fresh transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin size={18} className="text-fresh" />
                <span>Faisalabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone size={18} className="text-fresh" />
                <span>+92 3287873807</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail size={18} className="text-fresh" />
                <span>noorfatima82005@gmail.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-fresh hover:text-foreground transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-fresh hover:text-foreground transition-all"
              >
                <Music2 size={20} />
              </a>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Founded by <span className="text-fresh font-medium">Noorfatima</span>
            </p>
          </motion.div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} Feelfresh Café. All rights reserved. Made with ❤️ in Faisalabad.
          </p>
        </div>
      </div>
    </footer>
  );
};
