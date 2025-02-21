"use client"

import { useEffect } from "react"

export default function ScrollProgress() {
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      document.documentElement.style.setProperty("--scroll-percent", `${scrollPercent}%`)
    }

    window.addEventListener("scroll", updateScrollProgress)
    updateScrollProgress() // Initial call

    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return null
}

