"use client"

import { motion } from "framer-motion"

export default function Skills() {
  const skills = [
    { "category": "Programming Languages", "items": ["Python", "Java", "C++", "C", "JavaScript", "SQL"] },
    { "category": "Machine Learning & AI", "items": ["Scikit-Learn", "TensorFlow", "PyTorch", "Keras", "NLP", "Transformers", "LLMs", "RAG", "LangChain", "FAISS"] },
    { "category": "Data Science & Analytics", "items": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau"] },
    { "category": "Databases", "items": ["MySQL", "MongoDB", "Firebase"] },
    { "category": "DevOps & Tools", "items": ["Git", "GitHub", "Docker"] },
    { "category": "Web Development", "items": ["React", "Next.js", "HTML", "CSS", "TailwindCSS", "Node.js", "Express.js", "Flask", "Django"] }
  ]

  return (
    <motion.section
      id="skills"
      className="py-20 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-soft-teal-800">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillSet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-soft-teal-700">{skillSet.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillSet.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="bg-soft-teal-100 text-soft-teal-800 rounded-full px-3 py-1 text-sm font-semibold"
                    whileHover={{ scale: 1.1, backgroundColor: "#4fd1c5" }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

