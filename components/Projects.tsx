"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Github, ChevronLeft, ChevronRight } from "lucide-react"

export default function Projects() {
  const projects = [
    { 
      "title": "SpotiFind Rx",
      "description": "An AI-powered navigation aid for the visually impaired, featuring real-time object detection, depth mapping, and multilingual assistance. It integrates prescription OCR and intelligent medication verification for enhanced accessibility and safety.",
      "technologies": ["YOLO v12", "Gemini", "Depth Anything", "Hugging Face", "MongoDB Atlas", "Next.js"],
      "image": "/placeholder.svg?height=200&width=300",
      "github": "https://github.com/nimit/hopperHacks"
    },
    {
      "title": "BrokeNoMore!",
      "description": "An AI-driven financial management web app that helps users track and manage expenses. It leverages Conversational AI and RAG to provide personalized financial insights based on user-specific spending patterns.",
      "technologies": ["LangChain", "Gemini","RAG", "FAISS", "React", "Next.js", "Flask"],
      "image": "/placeholder.svg?height=200&width=300",
      "github": "https://github.com/spongy01/brokenomore"
    },
    {
      "title": "miniGPT",
      "description": "A small-scale GPT-2-like transformer model built from scratch using PyTorch. Trained on the miniShakespeare dataset to generate human-like text, exploring deep learning and NLP concepts.",
      "technologies": ["PyTorch", "Transformers", "NLP", "Deep Learning"],
      "image": "/placeholder.svg?height=200&width=300",
      "github": "https://github.com/spongy01/miniGPT"
    },
    {
      "title": "DataDerby",
      "description": "A real-time horse racing probability model that predicts race outcomes using machine learning. It leverages XGBoost, Poisson distribution, and Monte Carlo simulations for accurate betting insights.",
      "technologies": ["XGBoost", "Poisson Distribution", "Monte Carlo Simulations", "Machine Learning"],
      "image": "/placeholder.svg?height=200&width=300",
      "github": "https://github.com/Spongy01/DataDerby-LiveRace-Probability-Engine"
    },
    {
      "title": "Humour Detector",
      "description": "An NLP-based model that classifies text as humorous or not with high accuracy. Uses machine learning and transformers to analyze linguistic patterns and detect humor in real-time.",
      "technologies": ["NLP", "Transformers", "Scikit-Learn", "Machine Learning"],
      "image": "/placeholder.svg?height=200&width=300",
      "github": 'https://github.com/Spongy01/Humour-Detection'
    },
    {
      "title": "Excel Trader",
      "description": "A Python-based trade helper application that streamlines stock market trades through an Excel interface. Designed to improve execution speed and user efficiency by integrating with a trading API.",
      "technologies": ["Python", "Excel Automation", "Trading API", "Data Processing"],
      "image": "/placeholder.svg?height=200&width=300",
      "github": "https://github.com/spongy01/Excel-Trader"
    },
    {
      "title": "InterConnectX",
      "description": "A middleware application enabling seamless communication between diverse clients using distinct API protocols like REST and SOAP. Built using Django, it provides a robust and scalable solution for API integration.",
      "technologies": ["Python", "Django", "REST", "SOAP", "SQL"],
      "image": "/placeholder.svg?height=200&width=300",
      "github": "https://github.com/spongy01/InterConnectX"
    },
    {
      "title": "Question Paper Generator",
      "description": "A dynamic question paper generator that creates customized papers based on criteria like total marks and difficulty distribution. Designed with a modular architecture for easy updates and integration.",
      "technologies": ["Node.js", "JavaScript"],
      "image": "/placeholder.svg?height=200&width=300",
      "github": "https://github.com/spongy01/Question-Paper-Generator"
    },

    


  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  return (
    <motion.section
      id="projects"
      className="py-20 bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-soft-teal-800 dark:text-soft-teal-200">Projects</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 md:pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
              >
                <Image
                  src={projects[currentIndex].image || "/placeholder.svg"}
                  alt={projects[currentIndex].title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-soft-teal-700 dark:text-soft-teal-300">
                    {projects[currentIndex].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{projects[currentIndex].description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projects[currentIndex].technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-soft-teal-100 dark:bg-soft-teal-800 text-soft-teal-800 dark:text-soft-teal-100 rounded-full px-3 py-1 text-sm font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={projects[currentIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-soft-teal-600 dark:text-soft-teal-300 hover:text-soft-teal-800 dark:hover:text-soft-teal-100"
                  >
                    <Github size={20} className="mr-2" />
                    View on GitHub
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-full md:w-1/4 mt-8 md:mt-0 flex flex-col justify-between">
            <div className="flex flex-col items-center">
              <div className="w-full md:h-64 md:w-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full md:w-full bg-soft-teal-500 dark:bg-soft-teal-400"
                  initial={false}
                  animate={{ height: `${((currentIndex + 1) / projects.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {currentIndex + 1} / {projects.length}
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={prevProject}
                className="bg-soft-teal-500 text-white p-2 rounded-full hover:bg-soft-teal-600 transition duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextProject}
                className="bg-soft-teal-500 text-white p-2 rounded-full hover:bg-soft-teal-600 transition duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

