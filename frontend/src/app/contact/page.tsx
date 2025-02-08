"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("https://kajalproducts-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setSuccess("Your message has been sent! Thank You");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        console.error("Fetch error:", error.message); //  Access error message safely
      } else {
        console.error("An unknown error occurred", error);
      }

      alert("Failed to connect to the server.");
    }
  };

  return (
    <section id="contact">
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white py-12 pt-36 flex flex-col items-center">
        <motion.h1 className="text-3xl md:text-6xl font-bold text-pink-700 mb-8 text-center">
          Contact Us
        </motion.h1>

        <motion.div className="bg-pink-100 shadow-lg rounded-2xl p-8 w-full max-w-lg border border-pink-300">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-500 text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-500 text-black"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-500 text-black"
            />
            <motion.button
              type="submit"
              className="px-6 py-3 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-600 transition-all"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
          {success && (
            <p className="text-green-600 text-center mt-2">{success}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
