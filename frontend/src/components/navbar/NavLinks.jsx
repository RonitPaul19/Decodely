import navLinks from "../../data/navLinks"

export default function NavLinks() {
  return (
    <ul className="hidden md:flex items-center gap-8 text-zinc-300 font-medium">

      {navLinks.map((link) => (
        <li
          key={link.id}
          className="hover:text-white transition cursor-pointer"
        >
          {link.title}
        </li>
      ))}

    </ul>
  )
}
