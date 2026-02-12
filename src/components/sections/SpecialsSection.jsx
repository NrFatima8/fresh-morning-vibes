import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const FloatingDessert = ({ position, color, size = 0.5 }) => {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={[size, 0]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.2} roughness={0.3} />
      </mesh>
    </Float>
  );
};

const SpecialsScene = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, 5, -5]} intensity={0.4} color="#FFD166" />
          <FloatingDessert position={[-3, 2, -2]} color="#8B6D5C" size={0.4} />
          <FloatingDessert position={[3, -1.5, -1]} color="#E08D79" size={0.5} />
          <FloatingDessert position={[-2.5, -2, -3]} color="#A3D9A5" size={0.35} />
          <FloatingDessert position={[2.5, 1.5, -2]} color="#FFD166" size={0.45} />
          <FloatingDessert position={[0, 2.5, -4]} color="#E08D79" size={0.3} />
          <FloatingDessert position={[-3.5, 0, -2]} color="#A3D9A5" size={0.4} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

const specialItems = [
  {
    name: "Brownie Cake",
    description: "Our signature rich chocolate brownie with velvety fudge topping, served warm with a dollop of vanilla ice cream.",
    price: "Rs. 550",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop",
    badge: "Best Seller",
    color: "terracotta",
  },
  {
    name: "Pastry & Coffee Combo",
    description: "Choose any artisan pastry paired with our signature latte or cappuccino. The perfect morning indulgence.",
    price: "Rs. 680",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    badge: "Popular",
    color: "golden",
  },
  {
    name: "Superfood Breakfast Bowl",
    description: "Acai base topped with fresh berries, granola, chia seeds, coconut flakes, and a drizzle of local honey.",
    price: "Rs. 580",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop",
    badge: "Healthy Pick",
    color: "fresh",
  },
];

export const SpecialsSection = () => {
  return (
    <section id="specials" className="py-24 bg-card relative overflow-hidden">
      <SpecialsScene />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-fresh font-medium uppercase tracking-wider text-sm">House Specials</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-3 mb-4">
            Signature <span className="text-gradient">Creations</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            These aren't just menu items—they're experiences. Our most loved creations that keep guests coming back for more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {specialItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -12 }}
              className="group"
            >
              <div className="relative bg-background rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden h-64">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-semibold ${
                    item.color === "terracotta"
                      ? "bg-terracotta text-terracotta-foreground"
                      : item.color === "golden"
                      ? "bg-golden text-golden-foreground"
                      : "bg-fresh text-fresh-foreground"
                  }`}>
                    {item.badge}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-bold text-foreground">{item.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-3 group-hover:text-fresh transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
