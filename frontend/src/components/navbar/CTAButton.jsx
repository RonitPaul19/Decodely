import { Link } from "react-router-dom"

// CTA in the navbar: shows a small Login link and the primary Try button.
export default function CTAButton() {
  return (
    <div className="flex items-center gap-4">
      <Link to="/login" className="text-zinc-300 hover:text-white">
        Log in
      </Link>

      <Link
        to="/try"
        className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300"
      >
        Try Now
      </Link>
    </div>
  )
}
