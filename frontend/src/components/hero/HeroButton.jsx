import { Link } from "react-router-dom"

export default function HeroButton() {
  return (
    <Link
      to="/try"
      className="mt-10 inline-block bg-white text-black px-7 py-3 rounded-2xl text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-white/10"
    >
      Explain My Code
    </Link>
  )
}
