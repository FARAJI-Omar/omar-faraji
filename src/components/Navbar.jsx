import React, { useEffect, useState } from "react"
import logoImage from "../assets/logo2.png"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = ["about", "services", "projects", "contact"]

    const path = window.location.pathname.replace(/^\//, "")
    if (path && sections.includes(path)) {
      const el = document.getElementById(path)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50)
        setActiveSection(path)
        window.history.replaceState(null, "", `/${path}`)
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const scrollPos = window.scrollY + 100
      for (let section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            window.history.replaceState(null, "", `/${section}`)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [menuOpen])

  const navLinks = ["about", "services", "projects", "contact"]

  const handleNavClick = (e, link) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    const el = document.getElementById(link)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    window.history.replaceState(null, "", `/${link}`)
    setActiveSection(link)
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-bg px-6 md:px-16 py-4 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.4)]" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            className="border-none bg-transparent p-0 cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
              window.history.replaceState(null, "", "/")
              setMenuOpen(false)
            }}
          >
            <img src={logoImage} alt="Logo" className="w-[50px] h-[50px] object-contain flex-shrink-0" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map(link => (
              <a
                key={link}
                href={`/${link}`}
                onClick={(e) => handleNavClick(e, link)}
                className={`flex flex-col items-center gap-1.5 no-underline transition-colors duration-200 font-medium ${
                  activeSection === link
                    ? "text-white font-extrabold text-[1.2rem]"
                    : "text-[#8a8f9e] hover:text-white text-[1.1rem]"
                }`}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
                {activeSection === link && <span className="nav-dot"></span>}
              </a>
            ))}
          </nav>

          {/* Hamburger button (mobile only) */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none z-[60]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-bg flex flex-col items-center justify-center gap-10 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map(link => (
          <a
            key={link}
            href={`/${link}`}
            onClick={(e) => handleNavClick(e, link)}
            className={`flex flex-col items-center gap-2 no-underline text-2xl font-semibold transition-colors duration-200 ${
              activeSection === link ? "text-accent" : "text-[#8a8f9e]"
            }`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
            {activeSection === link && <span className="nav-dot"></span>}
          </a>
        ))}
      </div>
    </>
  )
}
