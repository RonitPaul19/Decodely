import HeroTitle from "./HeroTitle"
import HeroDescription from "./HeroDescription"
import HeroButton from "./HeroButton"

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-32">

      <HeroTitle />

      <HeroDescription />

      <HeroButton />

    </section>
  )
}
