"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock, FiInstagram, FiFacebook, FiChevronDown } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });



      const data = await res.json();

      if (res.ok) {
        setSuccess("Thank you! We have received your message and will get back to you shortly.");
        setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
      { icon: <FiPhone />, title: "Call Us", details: "+91 94705 09040", link: "tel:+919470509040" },
      { icon: <FaWhatsapp />, title: "WhatsApp", details: "+91 95701 88409", link: "https://wa.me/919470509040" },
      { icon: <FiMail />, title: "Email Us", details: "kajalproducts@gmail.com", link: "mailto:kajalproducts@gmail.com" },
      { icon: <FiMapPin />, title: "Head Office", details: "Budhiyakhad, Giridih, Jharkhand", link: "https://maps.app.goo.gl/4sXPzw44GmZqMB3YA?g_st=ac" },
  ];

  return (
    <section id="contact" className="relative min-h-screen bg-white overflow-hidden">
      {/* --- Premium Background --- */}
      <div 
        className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#fce7f3_1px,transparent_1px),linear-gradient(to_bottom,#fce7f3_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        style={{ maskImage: "radial-gradient(circle at 50% 0%, #000 70%, transparent 100%)", WebkitMaskImage: "radial-gradient(circle at 50% 0%, #000 70%, transparent 100%)" }}
      />
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] w-[30rem] h-[30rem] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-[10%] w-[25rem] h-[25rem] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />

      <div className="relative z-10 px-6 py-24 pt-32 lg:pt-40 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Contact Info */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-10"
            >
                <div>
                    <span className="text-pink-600 font-bold tracking-widest uppercase text-sm">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mt-2 mb-6">
                        We'd Love to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Hear from You</span>
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                        Whether you have a question about our cakes, want to place a custom order, or just want to say hello, our team is always ready to help!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {contactInfo.map((item, index) => (
                        <a 
                            key={index} 
                            href={item.link}
                            target={item.title === "Head Office" ? "_blank" : "_self"}
                            className="bg-white/60 p-6 rounded-2xl border border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all group"
                        >
                            <div className="text-3xl text-pink-500 mb-4 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.details}</p>
                        </a>
                    ))}
                </div>

                <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 flex items-start gap-4">
                    <FiClock className="text-2xl text-pink-600 shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                        <p className="text-sm text-gray-600">Mon - Sun: 8:00 AM - 10:00 PM</p>
                        <p className="text-sm text-gray-600 mt-1">We are open on all holidays!</p>
                    </div>
                </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 relative z-10">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Enter you name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-14 px-5 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder = "Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-14 px-5 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-black"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full h-14 px-5 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all cursor-pointer appearance-none text-gray-700"
                        >
                            <option>General Inquiry</option>
                            <option>Custom Cake Order</option>
                            <option>Franchise Opportunity</option>
                            <option>Feedback / Complaint</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                        <textarea
                            name="message"
                            required
                            placeholder="How can we help you?"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none text-black"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending Message..." : "Send Message"}
                    </motion.button>
                </form>
                {success && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-xl bg-green-600 text-green-900 text-center border border-green-300 shadow-sm"
                    >
                        <p className="font-bold">{success}</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
      </div>
    </section>
  );
}
