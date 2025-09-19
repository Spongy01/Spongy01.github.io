"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "skills", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = ["about", "experience", "projects", "skills", "contact"]

  return (
    <header className="sticky top-0 bg-navy-700 dark:bg-gray-900 text-white z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
        <div className="hidden md:flex space-x-4">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className={`hover:text-soft-teal-300 transition duration-300 ${activeSection === item ? "text-soft-teal-300" : ""}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
        <div className="text-xl font-bold text-teal-300 dark:text-teal-500">Ali Asgar</div>
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.slice(3).map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className={`hover:text-soft-teal-300 transition duration-300 ${activeSection === item ? "text-soft-teal-300" : ""}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
          <motion.a
            href="https://bit.ly/aliasgar-resume" // Replace with your actual resume link
            target="_blank"
            rel="noopener noreferrer"
            className="bg-soft-teal-600 hover:bg-soft-teal-700 text-white px-4 py-2 rounded-full transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-soft-teal-600 hover:bg-soft-teal-700 transition duration-300"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-navy-600 dark:bg-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className={`block py-2 px-4 hover:bg-navy-500 dark:hover:bg-gray-700 ${activeSection === item ? "text-soft-teal-300" : ""}`}
              onClick={toggleMobileMenu}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
          <Link
            href="https://drive.google.com/your-resume-link" // Replace with your actual resume link
            className="block py-2 px-4 hover:bg-navy-500 dark:hover:bg-gray-700"
            onClick={toggleMobileMenu}
          >
            Resume
          </Link>
          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark")
              toggleMobileMenu()
            }}
            className="w-full text-left py-2 px-4 hover:bg-navy-500 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </motion.div>
      )}
    </header>
  )
}

