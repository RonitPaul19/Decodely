export default function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>

      <ul className="space-y-2 text-zinc-400">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="hover:text-white transition"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
