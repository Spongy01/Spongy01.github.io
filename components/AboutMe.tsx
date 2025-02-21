"use client"

import { motion } from "framer-motion"

export default function AboutMe() {
  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-soft-teal-800">About Me</h2>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            Hello! Hey there! I'm Ali Asgar Padaria, a passionate graduate student at Stony Brook University pursuing 
            my M.S. in Computer Science. My journey in tech started with a B.Tech in Computer Science from Nirma University, 
            where I built a strong foundation in software development and machine learning.
          </p>
          <p className="text-lg">
          Currently, I'm diving deep into NLP and Large Language Models (LLMs), exploring how AI can revolutionize 
          human-computer interaction. I've worked on projects ranging from an AI-driven financial management system 
          to a real-time horse racing probability model and a miniGPT implementation for text generation. 
          Alongside my AI and ML projects, I also enjoy building software solutions, 
          some of which you'll find in the projects section below.
          </p>
          <p className="text-lg">
          Previously, I interned at Johnson Controls - Hitachi, where I engineered a Bluetooth ecosystem for smart AC control, 
          significantly improving communication efficiency. 
          </p>
          <p className="text-lg">
          When I’m not coding, you can find me buried in a book, exploring new ideas, or getting lost in a video game. 
          I love the thrill of learning something new—whether it’s a complex AI concept or just a random fact that sparks 
          curiosity!
          </p>
          <p className="text-lg">
          I'm always eager to learn, build, and collaborate on cutting-edge AI and ML projects. 
          If you're as excited about AI as I am, let's connect!  
          </p>
        </div>
      </div>
    </motion.section>
  )
}

