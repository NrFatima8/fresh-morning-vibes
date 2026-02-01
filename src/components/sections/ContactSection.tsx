import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, Instagram, Music2, Send, CalendarDays, ShoppingBag, Loader2 } from "lucide-react";

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_2c2xbx6";
const EMAILJS_TEMPLATE_ID = "template_ehbdmxg";
const EMAILJS_PUBLIC_KEY = "7K9faMDp_k0BUIKSR";

const orderSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number is too long"),
  items: z.string().trim().min(10, "Please describe your order").max(1000, "Order description is too long"),
});

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number is too long"),
  guests: z.string().min(1, "Please select number of guests"),
  time: z.string().min(1, "Please select a time slot"),
  notes: z.string().trim().max(500, "Notes are too long").optional(),
});

const newsletterSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
});

type OrderFormData = z.infer<typeof orderSchema>;
type ReservationFormData = z.infer<typeof reservationSchema>;
type NewsletterFormData = z.infer<typeof newsletterSchema>;

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM"
];

export const ContactSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"order" | "reservation">("order");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const orderForm = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { name: "", email: "", phone: "", items: "" },
  });

  const reservationForm = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { name: "", email: "", phone: "", guests: "", time: "", notes: "" },
  });

  const newsletterForm = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onOrderSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          message: data.items,
        },
        EMAILJS_PUBLIC_KEY
      );
      toast.success("Order received! We'll contact you shortly to confirm.");
      orderForm.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send order. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onReservationSubmit = (data: ReservationFormData) => {
    if (!selectedDate) {
      toast.error("Please select a date for your reservation.");
      return;
    }
    toast.success("Reservation request sent! We'll confirm via email.");
    reservationForm.reset();
    setSelectedDate(undefined);
  };

  const onNewsletterSubmit = (data: NewsletterFormData) => {
    toast.success("Thanks for subscribing! Fresh updates coming your way.");
    newsletterForm.reset();
  };

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-fresh font-medium uppercase tracking-wider text-sm">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-3 mb-4">
            Order & <span className="text-gradient">Reserve</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Place an order online or book your table for a delightful experience at Feelfresh.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-xl bg-background">
              {/* Tab Switcher */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveTab("order")}
                  className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "order"
                      ? "text-fresh border-b-2 border-fresh"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ShoppingBag size={18} />
                  Order Online
                </button>
                <button
                  onClick={() => setActiveTab("reservation")}
                  className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "reservation"
                      ? "text-fresh border-b-2 border-fresh"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CalendarDays size={18} />
                  Reserve Table
                </button>
              </div>

              <CardContent className="p-6">
                {activeTab === "order" ? (
                  <Form {...orderForm}>
                    <form onSubmit={orderForm.handleSubmit(onOrderSubmit)} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={orderForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={orderForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={orderForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+92 XXX XXXXXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={orderForm.control}
                        name="items"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Order</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your order (e.g., 2x Brownie Cake, 1x Signature Latte...)"
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-terracotta hover:bg-terracotta/90 text-terracotta-foreground rounded-full"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Submit Order
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...reservationForm}>
                    <form onSubmit={reservationForm.handleSubmit(onReservationSubmit)} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={reservationForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={reservationForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={reservationForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+92 XXX XXXXXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Date Picker */}
                      <div>
                        <FormLabel className="block mb-2">Select Date</FormLabel>
                        <div className="border rounded-lg p-3 inline-block">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="pointer-events-auto"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={reservationForm.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time Slot</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={reservationForm.control}
                          name="guests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Guests</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select guests" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <SelectItem key={num} value={String(num)}>
                                      {num} {num === 1 ? "Guest" : "Guests"}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={reservationForm.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special requests or notes..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-full">
                        <CalendarDays size={18} className="mr-2" />
                        Request Reservation
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Side Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Info */}
            <Card className="border-0 shadow-xl bg-foreground text-primary-foreground">
              <CardHeader>
                <CardTitle className="font-playfair">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href="tel:+92XXXXXXXXXX" className="flex items-center gap-3 hover:text-fresh transition-colors">
                  <Phone size={20} />
                  <span>+92 XXX XXXXXXX</span>
                </a>
                <a href="mailto:hello@feelfresh.cafe" className="flex items-center gap-3 hover:text-fresh transition-colors">
                  <Mail size={20} />
                  <span>hello@feelfresh.cafe</span>
                </a>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-0 shadow-xl bg-background">
              <CardHeader>
                <CardTitle className="font-playfair text-foreground">Follow Us</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center text-background hover:scale-110 transition-transform"
                >
                  <Music2 size={24} />
                </a>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border-0 shadow-xl bg-fresh/10">
              <CardHeader>
                <CardTitle className="font-playfair text-foreground">Stay Fresh</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Subscribe for exclusive offers, new menu updates, and fresh vibes!
                </p>
                <Form {...newsletterForm}>
                  <form onSubmit={newsletterForm.handleSubmit(onNewsletterSubmit)} className="space-y-3">
                    <FormField
                      control={newsletterForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-fresh hover:bg-fresh/90 text-fresh-foreground rounded-full">
                      Subscribe
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
