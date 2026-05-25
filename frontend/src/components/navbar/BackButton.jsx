import { useLocation, useNavigate } from "react-router-dom"

export default function BackButton() {
  const location = useLocation()
  const navigate = useNavigate()

  const goBack = () => {
    if (location.key === "default") {
      navigate("/")
      return
    }

    navigate(-1)
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300"
    >
      Go Back
    </button>
  )
}
