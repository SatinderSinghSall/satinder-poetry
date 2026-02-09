import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative py-40 overflow-hidden">
      {/* soft paper gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-white to-stone-200" />

      {/* gentle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_60%)]" />

      <div className="relative text-center max-w-3xl mx-auto px-6">
        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-800 mb-6 leading-tight">
          Let Your Words Be Heard
        </h2>

        {/* Subtext */}
        <p className="text-slate-600 mb-10 text-base sm:text-lg leading-relaxed">
          Poetry Web is a quiet place to share your voice — where your verses
          can travel gently and find the hearts they were meant for.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Submit Poem – Coming Soon */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="
                  px-12 py-7 text-lg rounded-3xl
                  bg-slate-900 text-white
                  shadow-md
                  hover:shadow-xl hover:-translate-y-0.5
                  transition
                "
              >
                Submit Your Poem
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader className="text-center">
                <DialogTitle className="font-serif text-2xl text-slate-800">
                  Coming Soon
                </DialogTitle>

                <DialogDescription className="mt-4 text-slate-600 leading-relaxed">
                  We’re carefully crafting a gentle space for poets to share
                  their work.
                  <br />
                  <br />
                  The submission feature will be available very soon.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 text-center">
                <Button variant="outline" className="rounded-xl">
                  I’ll be back ✨
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Read Poems */}
          <Link to="/poems">
            <Button
              size="lg"
              variant="outline"
              className="
                px-12 py-7 text-lg rounded-3xl
                border-slate-400 text-slate-700
                hover:bg-slate-900 hover:text-white
                transition
              "
            >
              Read Poems
            </Button>
          </Link>
        </div>

        {/* Soft reassurance */}
        <p className="mt-10 text-xs text-slate-500">
          Free to share • Written by humans • Read with care
        </p>
      </div>
    </section>
  );
}
