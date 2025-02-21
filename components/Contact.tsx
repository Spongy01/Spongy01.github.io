"use client"

import type React from "react"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("sending")

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    // try {
    //   // Replace this with your actual form submission logic
    //   // For example, you could use the Fetch API to send a POST request to your server
    //   await fetch("/api/contact", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })

    //   setFormStatus("sent")
    // } catch (error) {
    //   console.error("Error sending message:", error)
    //   setFormStatus("error")
    // }

    try {
      const response = await fetch("https://formsubmit.co/64b4f00245ad9daa4333f56c1de6829a", {
        method: "POST",
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error("Failed to send message")
      }
  
      setFormStatus("sent")
    } catch (error) {
      console.error("Error sending message:", error)
      setFormStatus("error")
    }
  }

  return (
    <motion.section
      id="contact"
      className="py-20 bg-soft-teal-700 dark:bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-6">
              Feel free to reach out to me for any opportunities or collaborations. I'm always excited to work on new
              and challenging projects!
            </p>
            <div className="flex space-x-6">
              <motion.a
                href="https://github.com/Spongy01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-soft-teal-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Github size={28} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/aliasgarpadaria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-soft-teal-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Linkedin size={28} />
              </motion.a>
              <motion.a
                href="mailto:aliasgar.padaria@stonybrook.edu"
                className="text-white hover:text-soft-teal-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Mail size={28} />
              </motion.a>
            </div>
          </div>
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300"
                required
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300"
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300"
                required
                placeholder="Your message here..."
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-soft-teal-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-soft-teal-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={formStatus === "sending"}
            >
              {formStatus === "idle" && "Send Message"}
              {formStatus === "sending" && "Sending..."}
              {formStatus === "sent" && "Message Sent!"}
              {formStatus === "error" && "Error. Please try again."}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  )
}

