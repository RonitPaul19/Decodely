import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CTAButton from "./CTAButton";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800 backdrop-blur-md sticky top-0 bg-zinc-950/80 z-50">
      <Logo />

      <NavLinks />

      <CTAButton />
    </nav>
  );
}
