import { Link } from "react-router-dom"

// CTA in the navbar that navigates to the Try page. Uses router Link
// so navigation is handled by the SPA router instead of a full reload.
export default function CTAButton() {
  return (
    <Link
      to="/try"
      className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300"
    >
      Try Now
    </Link>
  )
}
