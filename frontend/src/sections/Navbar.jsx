import Logo from "../components/navbar/Logo";
import NavLinks from "../components/navbar/NavLinks";
import CTAButton from "../components/navbar/CTAButton";
import BackButton from "../components/navbar/BackButton";

export default function Navbar({ hideLinks = false, showBackButton = false }) {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800 backdrop-blur-md sticky top-0 bg-zinc-950/80 z-50">
      <Logo />

      {!hideLinks && <NavLinks />}

      {showBackButton ? <BackButton /> : <CTAButton />}
    </nav>
  );
}
