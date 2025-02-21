"use client"

import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-soft-teal-700 to-soft-teal-500 dark:from-gray-800 dark:to-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-soft-teal-400 dark:to-soft-teal-700 text-transparent bg-clip-text">
              Ali Asgar
            </span>{" "}
            Padaria
          </motion.h1>
          <motion.div
            className="text-xl md:text-2xl lg:text-3xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <TypeAnimation
              sequence={[
                "Comp Sci Student @ Stony Brook University",
                2000,
                "Exploring NLP & Large Language Models",
                2000,
                "Building Intelligent AI Systems",
                2000,
                "I like RAG!!!",
                2000,
                "Passionate About Machine Learning & Data Science",
                2000,
                "Excited to share my knowledge with others!",
                2000,
                "Transforming Ideas into Scalable Solutions",
                2000,
                "Always ready to learn and grow!",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Number.POSITIVE_INFINITY}
            />
          </motion.div>
          <motion.a
            href="#about"
            className="inline-block px-8 py-4 bg-soft-teal-500 text-white rounded-full text-lg font-semibold hover:bg-soft-teal-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.a>
        </div>
      </div>
    </section>
  )
}

