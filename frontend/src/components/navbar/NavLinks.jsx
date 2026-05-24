import { Link } from "react-router-dom"
import navLinks from "../../data/navLinks"

// Navigation links in the header. Each link uses a router `to` value which may
// include a hash (e.g. '/#features') so the ScrollToHash utility will handle
// scrolling to the correct section after navigation.
export default function NavLinks() {
  return (
    <ul className="hidden md:flex items-center gap-8 text-zinc-300 font-medium">

      {navLinks.map((link) => (
        <li key={link.id} className="transition">
          <Link
            to={link.to}
            className="hover:text-white cursor-pointer"
          >
            {link.title}
          </Link>
        </li>
      ))}

    </ul>
  )
}
