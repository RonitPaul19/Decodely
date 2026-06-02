import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: replace with real auth call
    console.log("Login submit", { email, password })
    // For now, navigate to the Try page on submit
    navigate("/try")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
      <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-6 text-white">Sign in to your account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-zinc-300">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-white text-black px-4 py-2 rounded-xl font-semibold mt-2 hover:scale-105 transition duration-200"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-zinc-400">
          <span>Don't have an account? </span>
          <Link to="/" className="text-white font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
