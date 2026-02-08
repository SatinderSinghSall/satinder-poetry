export default function About() {
  return (
    <section className="relative py-32 bg-stone-100">
      {/* soft glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-10">
          About Poetry Web
        </h2>

        <p className="text-lg leading-9 text-slate-600">
          A quiet haven for poetry lovers — where emotions flow through words.
          Discover, read, and share verses that resonate with your heart and
          linger in your soul.
        </p>
      </div>
    </section>
  );
}
