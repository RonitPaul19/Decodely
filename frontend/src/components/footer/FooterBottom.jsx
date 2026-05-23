export default function FooterBottom({ bottom }) {
  return (
    <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between gap-4 text-zinc-500 text-sm">
      <p>{bottom.text.replace("YEAR", new Date().getFullYear())}</p>
      <p className="md:text-right">{bottom.rightText}</p>
    </div>
  );
}
