import { useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import navLinks from "../../data/navLinks"

// Navigation links in the header. Each link uses a router `to` value which may
// include a hash (e.g. '/#features') so the ScrollToHash utility will handle
// scrolling to the correct section after navigation.
export default function NavLinks() {
  const { hash, pathname } = useLocation()
  const [activeSection, setActiveSection] = useState(() => hash.replace("#", ""))
  const sectionIds = useMemo(
    () => navLinks.map((link) => getHashId(link.to)).filter(Boolean),
    []
  )

  useEffect(() => {
    if (pathname !== "/") {
      return
    }

    const updateActiveSection = () => {
      const probeY = window.scrollY + window.innerHeight * 0.3
      let nextActiveSection = ""

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId)
        if (section && section.offsetTop <= probeY) {
          nextActiveSection = sectionId
        }
      }

      setActiveSection(nextActiveSection)
    }

    const frameId = requestAnimationFrame(updateActiveSection)
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [hash, pathname, sectionIds])

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium">

      {navLinks.map((link) => {
        const isActive = pathname === "/" && activeSection === getHashId(link.to)

        return (
          <li key={link.id}>
            <Link
              to={link.to}
              className={`cursor-pointer transition-colors duration-200 hover:text-white ${
                isActive ? "text-white" : "text-zinc-400"
              }`}
            >
              {link.title}
            </Link>
          </li>
        )
      })}

    </ul>
  )
}

// this helper function extracts section IDs from links
function getHashId(to) {
  return to.split("#")[1] || ""
}
