export default function PricingButton({ popular }) {
  return (
    <button
      className={`
        w-full
        py-3
        rounded-2xl
        font-semibold

        transition-all
        duration-300

        ${
          popular
            ? `
              bg-violet-500
              text-white
              hover:bg-violet-400
            `
            : `
              bg-zinc-800
              text-white
              hover:bg-zinc-700
            `
        }
      `}
    >
      Get Started
    </button>
  );
}
