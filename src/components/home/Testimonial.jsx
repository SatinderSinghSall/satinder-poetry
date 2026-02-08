export default function Testimonial() {
  return (
    <section className="relative py-32 bg-white">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="text-3xl md:text-4xl font-serif italic text-slate-700 leading-relaxed">
          “This platform reignited my love for poetry.”
        </p>

        <p className="mt-8 text-sm tracking-wide text-slate-500">
          — Anna Thompson
        </p>
      </div>
    </section>
  );
}
