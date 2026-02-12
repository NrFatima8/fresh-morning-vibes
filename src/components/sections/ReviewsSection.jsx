import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  { name: "Sarah Ahmed", role: "Food Blogger", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", rating: 5, review: "The brownie cake here is absolutely divine! The perfect balance of rich chocolate and that melt-in-your-mouth texture. My go-to place for morning coffee." },
  { name: "Ali Hassan", role: "Regular Customer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 5, review: "Feelfresh lives up to its name! Every visit feels like a refreshing escape. The superfood bowl is my favorite—healthy and delicious." },
  { name: "Fatima Khan", role: "Coffee Enthusiast", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", rating: 5, review: "Best coffee in Faisalabad, hands down. The ambiance is so cozy and the staff is incredibly welcoming. Highly recommend the signature latte!" },
  { name: "Usman Malik", role: "Local Resident", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", rating: 5, review: "This café has become my second home. Perfect for work meetings or catching up with friends. The pastries are always fresh!" },
  { name: "Ayesha Riaz", role: "Health Coach", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", rating: 5, review: "Love that they have healthy options that actually taste amazing. The green detox juice and quinoa salad are fantastic choices." },
  { name: "Ahmed Raza", role: "Weekend Regular", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", rating: 5, review: "My family and I love spending our Sunday mornings here. Great vibes, delicious food, and excellent service. Keep up the good work!" },
];

export const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-fresh font-medium uppercase tracking-wider text-sm">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-3 mb-4">
            What Our Guests <span className="text-gradient">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Don't just take our word for it—hear from the wonderful people who make Feelfresh their daily destination.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
                <CardContent className="p-6">
                  <Quote className="text-fresh/30 w-10 h-10 mb-4" />
                  <p className="text-foreground/80 leading-relaxed mb-6">"{review.review}"</p>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-golden text-golden" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "5.0", label: "Average Rating" },
            { value: "2000+", label: "Happy Customers" },
            { value: "50+", label: "Menu Items" },
            { value: "365", label: "Days Open" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-playfair font-bold text-fresh">{stat.value}</p>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
