import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CTAButton from "./CTAButton";
import BackButton from "./BackButton";

export default function Navbar({ hideLinks = false, showBackButton = false }) {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800 backdrop-blur-md sticky top-0 bg-zinc-950/80 z-50">
      <Logo />

      {!hideLinks && <NavLinks />}

      {showBackButton ? <BackButton /> : <CTAButton />}
    </nav>
  );
}
