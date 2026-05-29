import { useEffect, useState } from "react";
import { getProfile, getSubscriptionStatus } from "../api/api";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import {
  Crown,
  Mail,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  BookOpenText,
  BellRing,
  CheckCircle2,
  Settings2,
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    getProfile().then((res) => setUser(res.data));

    getSubscriptionStatus().then((res) => setSubscription(res.data));
  }, []);

  if (!user) {
    return (
      <div
        className="
min-h-screen

      flex items-center justify-center

      bg-[#050816]

      text-white
    "
      >
        <div className="text-center">
          <div
            className="
          mx-auto

          h-16 w-16

          rounded-full

          border-2 border-emerald-400/20
          border-t-emerald-400

          animate-spin
        "
          />

          <p
            className="
          mt-6

          text-sm
          tracking-[0.25em]

          text-slate-400
        "
          >
            LOADING YOUR POETRY SPACE...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[#050816]

        text-white
      "
    >
      {/* background glows */}
      <div
        className="
        absolute top-0 left-0

        h-[500px] w-[500px]

        rounded-full

        bg-blue-500/10

        blur-[140px]
      "
      />

      <div
        className="
        absolute bottom-0 right-0

        h-[500px] w-[500px]

        rounded-full

        bg-emerald-500/10

        blur-[140px]
      "
      />

      <div
        className="
          relative

          max-w-7xl
          mx-auto

          px-4 py-10
          sm:px-6 sm:py-14
          lg:px-8
        "
      >
        {/* Title */}
        {/* ===== PAGE HERO TITLE ===== */}
        <div
          className="
          relative

          mb-20

          overflow-hidden

          rounded-[40px]

          border border-stone-200/80

          bg-gradient-to-br
          from-amber-50
          via-white
          to-stone-100

          px-6 py-20
          sm:px-10
          sm:py-24

          text-center

          shadow-[0_20px_80px_rgba(0,0,0,0.06)]
        "
        >
          {/* subtle glow */}
          <div
            className="
            absolute top-0 left-1/2

            h-[300px] w-[300px]

            -translate-x-1/2

            rounded-full

            bg-amber-200/30

            blur-[100px]
          "
          />

          {/* small label */}
          <div
            className="
            relative

            inline-flex items-center gap-2

            rounded-full

            border border-stone-200
            bg-white/80

            px-5 py-2

            text-[11px]
            tracking-[0.28em]

            text-stone-600

            backdrop-blur-sm
          "
          >
            ✦ SATINDER POETRY EXPERIENCE
          </div>

          {/* main title */}
          <h1
            className="
            relative

            mt-8

            font-serif

            text-5xl
            leading-tight

            text-stone-900

            sm:text-6xl
            lg:text-7xl
          "
          >
            My Quiet Corner
          </h1>

          {/* subtitle */}
          <p
            className="
            relative

            mt-5

            text-lg
            italic

            text-stone-500

            sm:text-xl
          "
          >
            “A poet is made of memories and metaphors.”
          </p>

          {/* profile label */}
          <div
            className="
            relative

            mt-8

            inline-flex items-center gap-3

            rounded-full

            border border-amber-200
            bg-amber-50

            px-6 py-3

            text-sm
            font-medium
            tracking-[0.18em]

            text-amber-700
          "
          >
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            PROFILE PAGE
          </div>
        </div>

        {/* HERO */}
        <div
          className="
        overflow-hidden

        rounded-[40px]

        border border-white/10

        bg-gradient-to-br
        from-[#0b132b]
        via-[#101935]
        to-[#071024]

        shadow-[0_40px_120px_rgba(0,0,0,0.45)]
      "
        >
          <div
            className="
          grid gap-10

          px-6 py-8
          sm:px-10 sm:py-12

          lg:grid-cols-[1.4fr_0.8fr]
          lg:items-center
        "
          >
            {/* left */}
            <div>
              <div
                className="
              inline-flex items-center gap-2

              rounded-full

              border border-white/10
              bg-white/5

              px-4 py-2

              text-[11px]
              tracking-[0.24em]

              text-white/80
            "
              >
                <Sparkles size={14} />
                SATINDER POETRY
              </div>

              <h1
                className="
              mt-8

              text-4xl
              font-serif
              leading-tight

              text-white

              sm:text-6xl
            "
              >
                My Quiet Corner
              </h1>

              <p
                className="
              mt-5

              max-w-2xl

              text-[15px]
              leading-8

              text-slate-300

              sm:text-lg
            "
              >
                A personal literary sanctuary where reflections, poems,
                memories, and quiet emotions gather into a more meaningful
                reading experience.
              </p>

              {/* quick actions */}
              <div
                className="
              mt-8

              flex flex-wrap gap-4
            "
              >
                <div
                  className="
                inline-flex items-center gap-2

                rounded-2xl

                border border-emerald-400/10
                bg-emerald-500/10

                px-5 py-4

                text-sm
                text-emerald-200
              "
                >
                  <ShieldCheck size={18} />
                  Membership Active
                </div>

                <div
                  className="
                inline-flex items-center gap-2

                rounded-2xl

                border border-white/10
                bg-white/5

                px-5 py-4

                text-sm
                text-white/80
              "
                >
                  <Mail size={18} />
                  Newsletter Connected
                </div>
              </div>
            </div>

            {/* right profile card */}
            <div
              className="
            rounded-[36px]

            border border-white/10
            bg-white/[0.04]

            p-6

            backdrop-blur-md
          "
            >
              <div
                className="
              flex flex-col items-center text-center
            "
              >
                {/* avatar */}
                <div
                  className="
                relative

                flex h-32 w-32
                items-center justify-center

                rounded-full

                bg-gradient-to-br
                from-emerald-400
                to-blue-500

                text-5xl
                font-bold

                text-white

                shadow-[0_20px_80px_rgba(16,185,129,0.35)]
              "
                >
                  {user.name.charAt(0).toUpperCase()}

                  <div
                    className="
                  absolute -bottom-1 -right-1

                  flex h-10 w-10
                  items-center justify-center

                  rounded-full

                  border-4 border-[#0f172a]

                  bg-emerald-400
                "
                  >
                    <CheckCircle2 size={18} className="text-black" />
                  </div>
                </div>

                <h2
                  className="
                mt-6

                text-3xl
                font-semibold
              "
                >
                  {user.name}
                </h2>

                <p
                  className="
                mt-2

                text-sm

                text-slate-400
              "
                >
                  {user.email}
                </p>

                <div
                  className="
                mt-5

                inline-flex items-center gap-2

                rounded-full

                border border-yellow-400/10
                bg-yellow-500/10

                px-4 py-2

                text-xs
                tracking-[0.18em]

                text-yellow-200
              "
                >
                  <Crown size={14} />

                  {user.role.toUpperCase()}
                </div>

                <p
                  className="
                mt-6

                text-sm
                leading-8

                text-slate-300
              "
                >
                  Writing poems between heartbeats and sunsets, collecting
                  emotions through verses and quiet reflections.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MEMBERSHIP SECTION */}
        {subscription && (
          <div className="mt-10">
            {subscription.subscribed ? (
              <SubscribedCard date={subscription.subscribedAt} />
            ) : (
              <NotSubscribedCard />
            )}
          </div>
        )}

        {/* STATS */}
        <div
          className="
        mt-10

        grid gap-5

        sm:grid-cols-2
        xl:grid-cols-4
      "
        >
          {[
            {
              icon: BookOpenText,
              title: "Poetry Journey",
              value: "∞",
              desc: "Ideas quietly growing",
            },
            {
              icon: Sparkles,
              title: "Member Since",
              value: new Date(user.createdAt).getFullYear(),
              desc: "Joined the literary space",
            },
            {
              icon: BellRing,
              title: "Newsletter",
              value: subscription?.subscribed ? "Active" : "Inactive",
              desc: "Poetry reflections enabled",
            },
            {
              icon: Settings2,
              title: "Experience",
              value: "Premium",
              desc: "Personalized reading flow",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
            rounded-[30px]

            border border-white/10
            bg-white/[0.04]

            p-6

            backdrop-blur-md

            transition-all

            hover:-translate-y-1
            hover:bg-white/[0.06]
          "
            >
              <div
                className="
              flex h-14 w-14
              items-center justify-center

              rounded-2xl

              bg-emerald-500/10

              text-emerald-300
            "
              >
                <item.icon size={24} />
              </div>

              <h3
                className="
              mt-6

              text-lg
              font-semibold
            "
              >
                {item.title}
              </h3>

              <p
                className="
              mt-3

              text-3xl
              font-bold
            "
              >
                {item.value}
              </p>

              <p
                className="
              mt-2

              text-sm

              text-slate-400
            "
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* SUPPORT SECTION */}
        <div
          className="
        mt-10

        overflow-hidden

        rounded-[36px]

        border border-white/10
        bg-gradient-to-r
        from-white/[0.04]
        to-white/[0.02]

        backdrop-blur-sm
      "
        >
          <div
            className="
          flex flex-col gap-6

          px-6 py-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
          >
            <div>
              <p
                className="
              text-[11px]
              tracking-[0.22em]

              text-slate-500
            "
              >
                SUPPORT & ASSISTANCE
              </p>

              <h3
                className="
              mt-3

              text-2xl
              font-semibold
            "
              >
                Need help with your experience?
              </h3>

              <p
                className="
              mt-3

              max-w-2xl

              text-sm
              leading-8

              text-slate-400
            "
              >
                Facing bugs, issues, or unexpected behavior? Contact the
                developer directly for assistance regarding your poetry
                experience.
              </p>
            </div>

            <a
              href="https://satinder-portfolio.vercel.app/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="
            inline-flex items-center justify-center gap-2

            rounded-2xl

            border border-emerald-400/10
            bg-emerald-500/10

            px-6 py-4

            text-sm
            font-medium

            text-emerald-200

            transition-all

            hover:bg-emerald-500/20
            hover:text-white
          "
            >
              Contact Developer
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubscribedCard({ date }) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="
overflow-hidden


    rounded-[36px]

    border border-emerald-400/10

    bg-gradient-to-br
    from-emerald-500/10
    via-[#071024]
    to-[#081229]

    backdrop-blur-md
  "
    >
      <div
        className="
      flex flex-col gap-8

      px-6 py-8

      lg:flex-row
      lg:items-center
      lg:justify-between
    "
      >
        {/* left */}
        <div className="flex items-start gap-5">
          <div
            className="
          flex h-16 w-16 shrink-0
          items-center justify-center

          rounded-2xl

          bg-emerald-500/15

          text-emerald-300
        "
          >
            <ShieldCheck size={30} />
          </div>

          <div>
            <p
              className="
            text-[11px]
            tracking-[0.22em]

            text-emerald-300/70
          "
            >
              MEMBERSHIP STATUS
            </p>

            <h3
              className="
            mt-2

            text-3xl
            font-semibold
          "
            >
              Subscription Active
            </h3>

            <p
              className="
            mt-3

            max-w-2xl

            text-sm
            leading-8

            text-slate-300
          "
            >
              You’re connected to the Satinder Poetry newsletter experience and
              will continue receiving newly published poems, reflections, and
              literary updates.
            </p>

            <div
              className="
            mt-5

            inline-flex items-center gap-2

            rounded-full

            border border-emerald-400/10
            bg-emerald-500/10

            px-4 py-2

            text-xs

            text-emerald-200
          "
            >
              Active since {formatted}
            </div>
          </div>
        </div>

        {/* actions */}
        <div
          className="
        flex flex-col gap-4

        sm:flex-row
      "
        >
          <a
            href="/newsletter"
            className="
          inline-flex items-center justify-center gap-2

          rounded-2xl

          border border-white/10
          bg-white/[0.05]

          px-5 py-4

          text-sm
          font-medium

          text-white

          transition-all

          hover:bg-white/[0.08]
        "
          >
            Manage Preferences
          </a>

          <ComingSoonDialog />
        </div>
      </div>
    </div>
  );
}

function NotSubscribedCard() {
  return (
    <div
      className="
overflow-hidden


    rounded-[36px]

    border border-amber-400/10

    bg-gradient-to-br
    from-amber-500/10
    via-[#071024]
    to-[#081229]

    backdrop-blur-md
  "
    >
      <div
        className="
      flex flex-col gap-8

      px-6 py-8

      lg:flex-row
      lg:items-center
      lg:justify-between
    "
      >
        <div className="flex items-start gap-5">
          <div
            className="
          flex h-16 w-16 shrink-0
          items-center justify-center

          rounded-2xl

          bg-amber-500/15

          text-amber-300
        "
          >
            <Mail size={30} />
          </div>

          <div>
            <p
              className="
            text-[11px]
            tracking-[0.22em]

            text-amber-300/70
          "
            >
              NEWSLETTER STATUS
            </p>

            <h3
              className="
            mt-2

            text-3xl
            font-semibold
          "
            >
              Not subscribed yet
            </h3>

            <p
              className="
            mt-3

            max-w-2xl

            text-sm
            leading-8

            text-slate-300
          "
            >
              Subscribe to receive newly published poems, literary reflections,
              early-access writings, and more thoughtful reading experiences.
            </p>
          </div>
        </div>

        <a
          href="/newsletter"
          className="
        inline-flex items-center justify-center gap-2

        rounded-2xl

        bg-amber-400

        px-6 py-4

        text-sm
        font-semibold

        text-black

        transition-all

        hover:scale-[1.02]
      "
        >
          Subscribe Now
        </a>
      </div>
    </div>
  );
}

function ComingSoonDialog() {
  return (
    <AlertDialog>
      {" "}
      <AlertDialogTrigger asChild>
        <button
          className="
rounded-2xl

        border border-red-400/10
        bg-red-500/10

        px-5 py-4

        text-sm
        font-medium

        text-red-200

        transition-all

        hover:bg-red-500/20

        cursor-pointer
      "
        >
          Unsubscribe
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="
      border border-white/10

      bg-[#0f172a]

      text-white
    "
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className="
          text-2xl
        "
          >
            Subscription management coming soon
          </AlertDialogTitle>

          <AlertDialogDescription
            className="
          pt-3

          text-slate-400
          leading-7
        "
          >
            We’re currently crafting a quieter and more flexible subscription
            management experience. Future updates will allow you to fully manage
            your poetry preferences and newsletter settings.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="pt-5">
          <AlertDialogCancel
            className="
          border border-white/10
          bg-white/5

          text-white

          hover:bg-white/10
        "
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
