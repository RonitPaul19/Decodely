import HeroTitle from "../components/hero/HeroTitle"
import HeroDescription from "../components/hero/HeroDescription"
import HeroButton from "../components/hero/HeroButton"

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-32">

      <HeroTitle />

      <HeroDescription />

      <HeroButton />

    </section>
  )
}
