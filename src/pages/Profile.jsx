import { useEffect, useState } from "react";
import { getProfile } from "../api/api";
import { getSubscriptionStatus } from "../api/api";

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

export default function Profile() {
  const [user, setUser] = useState(null);
  const [subscribed, setSubscribed] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    getProfile().then((res) => setUser(res.data));

    getSubscriptionStatus().then((res) => setSubscription(res.data));
  }, []);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <p className="animate-pulse text-gray-500 italic">
          Loading your story...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 px-6 py-20 text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-gray-900">
            My Quiet Corner
          </h1>
          <p className="mt-3 italic text-gray-500">
            “A poet is made of memories and metaphors.”
          </p>
        </div>

        {/* Paper Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-10 md:p-14 transition hover:shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-4xl font-bold text-white shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <h2 className="text-3xl font-semibold font-serif">{user.name}</h2>

              <p className="text-gray-500">{user.email}</p>

              <span className="inline-block px-4 py-1 rounded-full text-xs bg-amber-100 text-amber-700 border border-amber-200 capitalize">
                {user.role}
              </span>

              <p className="pt-4 italic text-gray-600 leading-relaxed max-w-xl">
                Here lives a collector of verses, a wanderer of words, writing
                poems between heartbeats and sunsets.
              </p>
            </div>
          </div>

          {subscription && (
            <div className="mt-10">
              {subscription.subscribed ? (
                <SubscribedCard date={subscription.subscribedAt} />
              ) : (
                <NotSubscribedCard />
              )}
            </div>
          )}

          {/* Divider */}
          <div className="my-10 border-t border-stone-200" />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-stone-50 rounded-xl p-6 hover:shadow-md transition">
              <p className="text-2xl font-semibold">∞</p>
              <p className="text-sm text-gray-500">Ideas brewing</p>
            </div>

            <div className="bg-stone-50 rounded-xl p-6 hover:shadow-md transition">
              <p className="text-2xl font-semibold">
                {new Date(user.createdAt).getFullYear()}
              </p>
              <p className="text-sm text-gray-500">Joined the journey</p>
            </div>

            <div className="bg-stone-50 rounded-xl p-6 hover:shadow-md transition">
              <p className="text-2xl font-semibold">Words</p>
              <p className="text-sm text-gray-500">Crafted daily</p>
            </div>
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
      className="flex items-center justify-between
      bg-emerald-50 border border-emerald-200
      text-emerald-700 px-6 py-4 rounded-2xl"
    >
      <div className="text-sm">
        <p className="font-medium">✓ You’re subscribed to Satinder Poetry</p>
        <p className="text-xs opacity-70 mt-1">Subscribed since {formatted}</p>
      </div>

      <ComingSoonDialog />
    </div>
  );
}

function NotSubscribedCard() {
  return (
    <div
      className="flex items-center justify-between
      bg-amber-50 border border-amber-200
      text-amber-700 px-6 py-4 rounded-2xl text-sm"
    >
      <span>Not subscribed to the newsletter yet</span>

      <a
        href="/newsletter"
        className="underline font-medium hover:text-amber-900"
      >
        Subscribe
      </a>
    </div>
  );
}

function ComingSoonDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="text-xs px-4 py-2 rounded-full
          border border-emerald-300
          hover:bg-emerald-100 transition"
        >
          Unsubscribe
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Feature coming soon</AlertDialogTitle>
          <AlertDialogDescription>
            Unsubscribing will be available in a future update. For now, you’ll
            continue receiving poetry updates.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
