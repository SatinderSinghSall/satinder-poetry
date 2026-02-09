export default function About() {
  return (
    <section className="relative py-32">
      {/* soft paper background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-white to-stone-100" />

      {/* gentle center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.035),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto text-center px-6">
        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-6">
          About Poetry Web
        </h2>

        {/* subtle divider */}
        <div className="w-12 h-px bg-slate-300 mx-auto mb-10" />

        {/* Body copy */}
        <p className="text-base md:text-lg leading-8 md:leading-9 text-slate-600 mb-6">
          Poetry Web is a quiet haven for lovers of words — a place where
          emotions move gently through verse, and meaning is found in the spaces
          between lines.
        </p>

        <p className="text-base md:text-lg leading-8 md:leading-9 text-slate-600">
          Here, you can discover poems, linger with them, and return whenever
          you need stillness, reflection, or a voice that understands.
        </p>
      </div>
    </section>
  );
}
