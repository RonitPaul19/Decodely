import { Link } from "react-router-dom"

// Brand/logo component. Links to home so users can always return to the
// main landing page by clicking the brand.
export default function Logo() {
  return (
    <Link to="/" className="text-2xl font-bold tracking-wide text-white">
      {"{D} Decodely"}
    </Link>
  )
}
