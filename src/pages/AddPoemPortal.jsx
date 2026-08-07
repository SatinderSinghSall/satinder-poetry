import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Feather,
  CheckCircle2,
  XCircle,
  Mail,
  ShieldCheck,
  Send,
  AlertCircle,
  ExternalLink,
  Info,
  UserPlus,
  MailCheck,
  KeyRound,
  FileText,
  ListOrdered,
  HelpCircle,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { submitPoemDraftApi } from "../api/api";
import AddPoemCTA from "@/components/AddPoemCTA_Main";

export default function AddPoemPortal() {
  const { user } = useAuth();

  // Subscription check
  const isSubscribed = Boolean(localStorage.getItem("hasNewsletter"));
  const isAuthenticated = Boolean(user);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    genre: "Poetry",
    content: "",
    noteToAdmin: "",
  });

  // Errors & Modal State
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Lock background scrolling when modal is active
  useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSuccessModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Poem title is required.";
    }
    if (!formData.genre.trim()) {
      newErrors.genre = "Genre or sub-category is required.";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Poem content cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePoemSubmission = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !isSubscribed) {
      toast.error("Requirements not met", {
        description: "You must log in and subscribe to submit a poem review.",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      await submitPoemDraftApi(formData);

      // Original toast notification
      toast.success("Submission Sent for Review!", {
        description:
          "Satinder Singh Sall will review your poem and grant access/publish upon approval.",
      });

      // Reset form & errors, then trigger success modal
      setFormData({ title: "", genre: "Poetry", content: "", noteToAdmin: "" });
      setErrors({});
      setShowSuccessModal(true);
    } catch (err) {
      toast.error("Submission Failed", {
        description:
          err.response?.data?.message || err.message || "Something went wrong.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const requirements = [
    {
      id: 1,
      title: "Active Platform Account",
      desc: "Must be registered and logged into Satinder Poetry.",
      status: isAuthenticated,
      actionText: "Register / Log In",
      actionLink: "/login",
    },
    {
      id: 2,
      title: "Newsletter Subscription",
      desc: "Subscribed to receive updates and literary insights.",
      status: isSubscribed,
      actionText: "Subscribe Now",
      actionLink: "/newsletter",
    },
    {
      id: 3,
      title: "Editorial Approval",
      desc: "Granted author privileges directly by Satinder Singh Sall.",
      status: user?.role === "admin" || user?.canAddPoems,
      actionText: "Contact Curator",
      actionLink: "mailto:satindersinghsall111@gmail.com",
    },
  ];

  const stepsInstructions = [
    {
      step: "01",
      icon: UserPlus,
      title: "Account Creation & Login",
      description:
        "Create a free account on Satinder Poetry and ensure you are logged in. Unauthenticated submissions are automatically restricted.",
    },
    {
      step: "02",
      icon: MailCheck,
      title: "Subscribe to Newsletter",
      description:
        "Join our reader community by subscribing to the newsletter. This verifies active readership before requesting publishing rights.",
    },
    {
      step: "03",
      icon: KeyRound,
      title: "Request Admin Authorization",
      description:
        "You cannot add poems directly without authorization. Contact founder and curator Satinder Singh Sall to request author-level permissions from the admin portal.",
    },
    {
      step: "04",
      icon: FileText,
      title: "Alternative Direct Draft Review",
      description:
        "Or, send your poem directly through Option A or email it to Satinder Singh Sall. He will personally review, refine, and publish your work with full author attribution.",
    },
  ];

  const guidelines = [
    "All submissions must be original work written by you.",
    "Content must align with the artistic and literary tone of Satinder Poetry.",
    "Explicit, harmful, or plagiarized content will be permanently rejected.",
    "Editorial revisions or formatting adjustments may be requested prior to publication.",
    "Once approved by Satinder, your poem will be featured with full author credit.",
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-stone-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-200/60 text-stone-700 text-xs font-semibold tracking-wider uppercase">
            <Feather className="w-3.5 h-3.5" /> Author Contributions
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Poet's Access Portal
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            Share your voice with the community. Review our submission
            guidelines, understand the access instructions, and request
            authorization from Satinder Singh Sall.
          </p>
        </div>

        {/* Prerequisites Status Cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Access Prerequisites
            </h2>
            <Badge
              variant="outline"
              className="border-stone-300 text-stone-600"
            >
              Mandatory Requirements
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {requirements.map((req) => (
              <Card
                key={req.id}
                className={`border transition-all duration-300 ${
                  req.status
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-stone-200 bg-white"
                }`}
              >
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                        Requirement 0{req.id}
                      </span>
                      {req.status ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      {req.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {req.desc}
                    </p>
                  </div>

                  {!req.status && (
                    <div className="pt-2">
                      {req.actionLink.startsWith("mailto:") ? (
                        <a
                          href={req.actionLink}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-stone-600 transition-colors"
                        >
                          {req.actionText} <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          to={req.actionLink}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-stone-600 transition-colors"
                        >
                          {req.actionText} <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Submission Instructions Section */}
        <div className="mb-16 bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <ListOrdered className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-serif font-bold text-slate-900">
              How to Publish Your Poem (Step-by-Step Instructions)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsInstructions.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="bg-stone-50/70 border border-stone-200/60 rounded-2xl p-5 space-y-3 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-white rounded-xl shadow-xs border border-stone-200/50">
                        <IconComp className="w-5 h-5 text-slate-800" />
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
                        STEP {item.step}
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-stone-100/80 border border-stone-200/80 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700 leading-relaxed font-light">
              <strong className="font-semibold text-slate-900">
                Note on Access Privileges:
              </strong>{" "}
              Direct access to post poems without prior approval is granted
              manually by Satinder Singh Sall. After reviewing your account
              activity and poem quality, full contributor status will be issued
              to your account.
            </div>
          </div>
        </div>

        {/* Access & Submission Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Direct Draft Submission Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6 space-y-1">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest">
                Option A
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Submit Poem Draft for Review
              </h3>
              <p className="text-xs text-slate-600 font-light">
                Submit your poem directly to Satinder Singh Sall for editorial
                evaluation. Approved drafts will be uploaded directly to the
                platform.
              </p>
            </div>

            <form
              onSubmit={handlePoemSubmission}
              noValidate
              className="space-y-4"
            >
              {/* Title Field */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Poem Title
                </label>
                <Input
                  type="text"
                  name="title"
                  placeholder="e.g., Whispers in the Dusk"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={!isAuthenticated || !isSubscribed}
                  className={`bg-stone-50/50 focus-visible:ring-slate-900 ${
                    errors.title
                      ? "border-rose-500 focus-visible:ring-rose-500"
                      : "border-stone-200"
                  }`}
                />
                {errors.title && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.title}</span>
                  </div>
                )}
              </div>

              {/* Genre Field */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Genre / Sub-category
                </label>
                <Input
                  type="text"
                  name="genre"
                  placeholder="e.g., Free Verse, Haiku, Reflection"
                  value={formData.genre}
                  onChange={handleInputChange}
                  disabled={!isAuthenticated || !isSubscribed}
                  className={`bg-stone-50/50 focus-visible:ring-slate-900 ${
                    errors.genre
                      ? "border-rose-500 focus-visible:ring-rose-500"
                      : "border-stone-200"
                  }`}
                />
                {errors.genre && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.genre}</span>
                  </div>
                )}
              </div>

              {/* Content Field */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Poem Content
                </label>
                <textarea
                  name="content"
                  rows={6}
                  placeholder="Paste your poem here..."
                  value={formData.content}
                  onChange={handleInputChange}
                  disabled={!isAuthenticated || !isSubscribed}
                  className={`w-full rounded-md bg-stone-50/50 p-3 text-sm focus:outline-none focus:ring-2 transition ${
                    errors.content
                      ? "border border-rose-500 focus:ring-rose-500"
                      : "border border-stone-200 focus:ring-slate-900"
                  }`}
                />
                {errors.content && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.content}</span>
                  </div>
                )}
              </div>

              {/* Note To Admin Field */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Note to Satinder (Optional)
                </label>
                <Input
                  type="text"
                  name="noteToAdmin"
                  placeholder="A short note introducing yourself or context for the poem"
                  value={formData.noteToAdmin}
                  onChange={handleInputChange}
                  disabled={!isAuthenticated || !isSubscribed}
                  className="bg-stone-50/50 border-stone-200 focus-visible:ring-slate-900"
                />
              </div>

              {!isAuthenticated || !isSubscribed ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    You must log in and subscribe to the newsletter to unlock
                    poem submissions.
                  </span>
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={!isAuthenticated || !isSubscribed || submitting}
                className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full py-6 font-medium cursor-pointer transition"
              >
                {submitting ? (
                  "Sending Request..."
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Draft to Satinder
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Direct Access Contact Pathway */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4 relative z-10">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest">
                  Option B
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Direct Access Request
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  Request full author access rights directly from founder
                  Satinder Singh Sall to post poems independently from your
                  profile.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-stone-200">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>satindersinghsall111@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-200">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Admin Access Management Review</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <a
                  href="mailto:satindersinghsall111@gmail.com?subject=Request%20for%20Poet%20Posting%20Access"
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-full py-3 px-6 text-sm font-semibold transition"
                >
                  Contact Curator <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />
            </div>

            {/* Publishing Guidelines Rules Box */}
            <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-serif font-bold">
                <Info className="w-4 h-4 text-slate-700" />
                <h4>Publishing & Quality Guidelines</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-light">
                {guidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-stone-400 font-mono">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <AddPoemCTA />
      </div>

      {/* SUCCESS MODAL OVERLAY */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Close 'X' Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Submission Sent for Review!
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Satinder Singh Sall will review your poem and grant access or
                  publish it upon approval.
                </p>
              </div>

              {/* Bottom Action Close Button */}
              <div className="w-full pt-2">
                <Button
                  onClick={closeModal}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-5 font-medium transition cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
