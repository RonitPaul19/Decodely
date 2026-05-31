import FooterBrand from "../components/footer/FooterBrand";
import FooterColumn from "../components/footer/FooterColumn";
import FooterBottom from "../components/footer/FooterBottom";
import { footerData } from "../data/FooterData"

// Footer contains company info and columns. `id="about"` lets the nav
// link scroll to this section directly.
export default function Footer() {
  return (
    <footer id="about" className="bg-black text-white border-t border-zinc-800 px-6 py-12">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">

        {/* Brand */}
        <FooterBrand
          name={footerData.brand.name}
          description={footerData.brand.description}
        />

        {/* Columns */}
        <div className="flex flex-col sm:flex-row gap-10">
          {footerData.columns.map((col, index) => (
            <FooterColumn
              key={index}
              title={col.title}
              links={col.links}
            />
          ))}
        </div>
      </div>

      <FooterBottom bottom={footerData.bottom} />
    </footer>
  );
}
