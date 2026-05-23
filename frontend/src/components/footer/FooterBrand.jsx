export default function FooterBrand({ name, description }) {
  return (
    <div className="md:max-w-sm">
      <h2 className="text-xl font-semibold mb-3">{name}</h2>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
