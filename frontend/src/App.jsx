// App routing entry: defines top-level routes and mounting points.
// Uses react-router for SPA navigation between pages.
import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./sections/Navbar"
import HomePage from "./pages/HomePage"
import TryNowPage from "./pages/TryNowPage.jsx"

export default function App() {
  const { pathname } = useLocation()
  const isTryPage = pathname === "/try"

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Main navigation bar */}
      <Navbar hideLinks={isTryPage} showBackButton={isTryPage} />

      {/* ScrollToHash ensures route+hash scrolling works reliably */}
      <ScrollToHash />

      {/* Route switch: maps paths to page components */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/try" element={<TryNowPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  )
}

function ScrollToHash() {
  // Listen to location changes and scroll to the element ID from the hash.
  // This makes navigation like `/` -> `/#features` scroll reliably in the SPA.
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      // No hash -> scroll to top of the page
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    // Remove leading "#" and try to find the element by id
    const id = hash.replace("#", "")
    const scrollToId = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    // Try immediately (works when element already rendered). If not,
    // retry shortly after to handle content that renders after navigation.
    scrollToId()
    const t = setTimeout(scrollToId, 50)
    return () => clearTimeout(t)
  }, [pathname, hash])

  return null
}
