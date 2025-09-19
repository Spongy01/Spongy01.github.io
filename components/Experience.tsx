"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export default function Experience() {

  const experiences = [
    {
      title: "AI Intern",
      company: "Zeblok Computational Inc.",
      period: "May 2025 - Present",
      description: [
        "Designed and deployed MCP servers for AI-PaaS, to enable AI agents to access and integrate multiple tools to execute autonomous, multi-step workflows.",
        "Implemented an Agentic Orchestration framework, integrating MCP servers to enable LLM agents to dynamically select tools and combine outputs into coherent responses, exposing capablities via API endpoints for client use.",
        "Streamlined code deployment by integrating GitHub Actions (CI/CD) workflows to automatically build Docker images and deploy microservices, ensuring production-ready agentic capabilities.",
      ],
    },
    {
      title: "Research and Development Intern",
      company: "Johnson Controls - Hitachi",
      period: "Jan 2024 - May 2024",
      description: [
        "Engineered an Android application in Java to control AC units via Bluetooth, replacing traditional IR remotes and improving communication efficiency by 40%.",
        "Integrated Bluetooth connectivity using Android libraries, ensuring seamless pairing and a 55m extended range in LOS conditions.",
        "Collaborated on firmware development using C and Simplicity Studio, optimizing Bluetooth communication between mobile devices and embedded systems.",
        "Adapted quickly to new technologies, gaining hands-on experience in Android development, embedded systems, and wireless communication protocols.",
      ],
    }
  ]

return (
    <motion.section
      id="experience"
      className="py-20 bg-soft-teal-600 dark:bg-gray-800 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Experience</h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mt-1 text-soft-teal-200 dark:text-soft-teal-300">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{experience.title}</h3>
                <p className="text-soft-teal-200 dark:text-soft-teal-300">
                  {experience.company} | {experience.period}
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2">
                  {experience.description.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}