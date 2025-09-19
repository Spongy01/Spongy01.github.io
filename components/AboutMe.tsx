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
            Hello! I'm Ali Asgar, a graduate student at Stony Brook University pursuing an M.S. in Computer Science. 
            Alongside my studies, I work as an LLM/AI Engineer Intern at Zeblok Computational Inc., where I develop 
            AI-powered solutions and work on cutting-edge projects. I completed my B.Tech in Computer Science from 
            Nirma University in 2024.
          </p>
          <p className="text-lg">
          My interests lie in NLP and Large Language Models (LLMs), exploring how AI can transform human-computer 
          interaction. I’ve worked on projects ranging from building an AI-driven financial management system to 
          developing a real-time horse racing probability model and implementing a miniGPT for text generation. 
          Beyond AI/ML, I enjoy creating software solutions, some of which you can explore in the projects section below.
          </p>
          <p className="text-lg">
          Previously, I interned at Johnson Controls - Hitachi, where I engineered a Bluetooth ecosystem for smart AC control
          that significantly improved communication efficiency. 
          </p>
          <p className="text-lg">
          When I’m not coding, you can find me buried in fiction, exploring new ideas, or getting lost in a video game. 
          I love the thrill of learning something new—whether it’s a complex technical concept or just a random fact that sparks 
          curiosity!
          </p>
          <p className="text-lg">
          I'm always eager to learn, build, and collaborate on AI and ML projects. 
          If you're as excited about AI as I am, let's connect!  
          </p>
        </div>
      </div>
    </motion.section>
  )
}

