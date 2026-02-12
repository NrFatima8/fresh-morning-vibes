import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const menuCategories = [
  { id: "beverages", name: "Beverages", icon: "☕" },
  { id: "bakery", name: "Bakery & Pastries", icon: "🥐" },
  { id: "breakfast", name: "Breakfast", icon: "🍳" },
  { id: "healthy", name: "Healthy Options", icon: "🥗" },
  { id: "treats", name: "Treats & Extras", icon: "🍰" },
];

const menuItems = {
  beverages: [
    { name: "Signature Latte", description: "Creamy espresso with velvety steamed milk", price: "Rs. 450", image: "https://images.unsplash.com/photo-1541167760496-9a2d4c2cc1d0?w=400&h=300&fit=crop", featured: true },
    { name: "Fresh Mint Tea", description: "Refreshing herbal tea with fresh mint leaves", price: "Rs. 280", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop" },
    { name: "Mango Smoothie", description: "Tropical mango blended with yogurt", price: "Rs. 380", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop" },
    { name: "Iced Americano", description: "Bold espresso over ice", price: "Rs. 350", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=300&fit=crop" },
  ],
  bakery: [
    { name: "Brownie Cake", description: "Rich chocolate brownie with fudge topping", price: "Rs. 550", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop", featured: true },
    { name: "Butter Croissant", description: "Flaky, golden French pastry", price: "Rs. 320", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop" },
    { name: "Cinnamon Roll", description: "Warm roll with cream cheese glaze", price: "Rs. 380", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=300&fit=crop" },
    { name: "Almond Danish", description: "Puff pastry with almond filling", price: "Rs. 350", image: "https://images.unsplash.com/photo-1623334044303-241021148842?w=400&h=300&fit=crop" },
  ],
  breakfast: [
    { name: "Avocado Toast", description: "Sourdough with smashed avocado and eggs", price: "Rs. 520", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop" },
    { name: "Classic Egg Wrap", description: "Scrambled eggs with cheese in tortilla", price: "Rs. 420", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop" },
    { name: "Pancake Stack", description: "Fluffy pancakes with maple syrup", price: "Rs. 480", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop" },
    { name: "BLT Sandwich", description: "Bacon, lettuce, tomato on toasted bread", price: "Rs. 450", image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400&h=300&fit=crop" },
  ],
  healthy: [
    { name: "Superfood Bowl", description: "Acai, granola, fresh berries, and honey", price: "Rs. 580", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop", featured: true },
    { name: "Green Detox Juice", description: "Spinach, apple, ginger, and lemon", price: "Rs. 380", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop" },
    { name: "Fruit Parfait", description: "Layers of yogurt, granola, and fruits", price: "Rs. 420", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop" },
    { name: "Quinoa Salad", description: "Fresh veggies with lemon dressing", price: "Rs. 480", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  ],
  treats: [
    { name: "Chocolate Éclair", description: "Cream-filled pastry with chocolate glaze", price: "Rs. 380", image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=300&fit=crop" },
    { name: "Cheesecake Slice", description: "New York style with berry compote", price: "Rs. 450", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop" },
    { name: "Macarons", description: "Assorted French macarons (4 pcs)", price: "Rs. 520", image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop" },
    { name: "Tiramisu", description: "Classic Italian coffee dessert", price: "Rs. 480", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" },
  ],
};

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("beverages");

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-fresh font-medium uppercase tracking-wider text-sm">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-3 mb-4">
            Crafted with <span className="text-gradient">Love</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From artisanal coffee to fresh pastries, every item is prepared with 
            the finest ingredients to brighten your day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {menuCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-foreground text-background"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {menuItems[activeCategory]?.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, rotateY: 5 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.featured && (
                      <div className="absolute top-3 right-3 bg-golden text-golden-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        ⭐ Signature
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair font-semibold text-lg text-foreground group-hover:text-fresh transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-terracotta font-semibold whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
