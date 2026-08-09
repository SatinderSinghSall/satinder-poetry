import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Eye,
  ArrowLeft,
  Share2,
  User,
  Clock,
  Copy,
  Check,
  Twitter,
  Linkedin,
  Facebook,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import BlogNotFound from "./BlogNotFound";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fetch blog data
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/blogs/${slug}`);
        if (res.data.success) {
          setBlog(res.data.data);
        } else {
          setBlog(null);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Blog post not found.");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlogDetail();
  }, [slug]);

  // Reading progress tracker bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Copy link helper
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Article link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  // Estimate reading time (average 200 words per minute)
  const calculateReadTime = (content = "") => {
    const words = content
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  // Social share URLs generator
  const currentUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog?.title || "");
  const shareSummary = encodeURIComponent(blog?.excerpt || "");

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-32 rounded-xl" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
        <Skeleton className="h-14 w-4/5 rounded-2xl" />
        <Skeleton className="h-6 w-3/5 rounded-lg" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return <BlogNotFound />;
  }

  const sanitizedContent = DOMPurify.sanitize(blog.content || "");
  const isHtml = /<[a-z][\s\S]*>/i.test(blog.content || "");

  return (
    <>
      {/* Dynamic SEO Meta & Social OpenGraph Tags */}
      <Helmet>
        <title>{`${blog.title} | Satinder Poetry`}</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        {blog.tags && <meta name="keywords" content={blog.tags.join(", ")} />}

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        <meta property="og:url" content={window.location.href} />
        {blog.coverImage && (
          <meta property="og:image" content={blog.coverImage} />
        )}
        <meta property="og:site_name" content="Satinder Poetry" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt || blog.title} />
        {blog.coverImage && (
          <meta name="twitter:image" content={blog.coverImage} />
        )}

        {/* Article Schema Microdata */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: [blog.coverImage],
            datePublished: blog.publishedAt || blog.createdAt,
            author: {
              "@type": "Person",
              name: blog.author?.name || "Satinder Singh Sall",
            },
            description: blog.excerpt,
          })}
        </script>
      </Helmet>

      {/* Floating Top Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-chart-1 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20 py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Soft Ambient Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-10">
          {/* Navigation & Premium Share Trigger */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-2 text-muted-foreground hover:text-foreground rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Articles
            </Button>

            {/* Premium Share Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/80 bg-card/80 text-xs font-medium shadow-2xs hover:border-primary/40 transition-all cursor-pointer"
                >
                  <Share2 className="h-4 w-4 text-primary" /> Share Article
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md w-[calc(100vw-2rem)] rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-2xl overflow-hidden">
                <DialogHeader className="text-left space-y-1 pr-6">
                  <DialogTitle className="text-lg font-serif font-bold text-foreground">
                    Share this Story
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground">
                    Spread the reflection across your favorite platforms.
                  </p>
                </DialogHeader>

                {/* Main Container - Guarantees No Horizontal Scroll */}
                <div className="w-full min-w-0 space-y-4 pt-2">
                  {/* Article Snippet Card Preview */}
                  <div className="w-full p-3 rounded-xl bg-muted/40 border border-border/60 flex items-center gap-3 overflow-hidden box-border">
                    {blog?.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-serif font-bold text-foreground truncate w-full">
                        {blog?.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5 w-full">
                        {blog?.excerpt ||
                          "Reflections & insights on poetry and creative expression."}
                      </p>
                    </div>
                  </div>

                  {/* Social Actions Grid (Responsive 2x2 on small screens, 4-col on desktop) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                    <a
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-muted/20 hover:bg-emerald-500/10 border border-border/40 text-muted-foreground hover:text-emerald-600 transition-colors text-[11px] font-medium text-center"
                    >
                      <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      WhatsApp
                    </a>

                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-muted/20 hover:bg-sky-500/10 border border-border/40 text-muted-foreground hover:text-sky-500 transition-colors text-[11px] font-medium text-center"
                    >
                      <div className="p-2 rounded-full bg-sky-500/10 text-sky-500">
                        <Twitter className="h-4 w-4" />
                      </div>
                      X (Twitter)
                    </a>

                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-muted/20 hover:bg-blue-600/10 border border-border/40 text-muted-foreground hover:text-blue-600 transition-colors text-[11px] font-medium text-center"
                    >
                      <div className="p-2 rounded-full bg-blue-600/10 text-blue-600">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      LinkedIn
                    </a>

                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-muted/20 hover:bg-blue-700/10 border border-border/40 text-muted-foreground hover:text-blue-700 transition-colors text-[11px] font-medium text-center"
                    >
                      <div className="p-2 rounded-full bg-blue-700/10 text-blue-700">
                        <Facebook className="h-4 w-4" />
                      </div>
                      Facebook
                    </a>
                  </div>

                  {/* Direct Link Copy Bar */}
                  <div className="pt-3 border-t border-border/60 flex items-center gap-2 w-full min-w-0">
                    <div className="flex-1 px-3 py-2 bg-muted/60 border border-border/50 rounded-xl text-[11px] text-muted-foreground truncate font-mono min-w-0">
                      {window.location.href}
                    </div>
                    <Button
                      size="sm"
                      onClick={handleCopyLink}
                      className="rounded-xl gap-1 text-xs shrink-0 h-8 px-3"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />{" "}
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Header Content */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {blog.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 text-xs rounded-lg border bg-secondary/70 hover:bg-secondary transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-foreground leading-[1.15] drop-shadow-xs">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-lg sm:text-xl text-muted-foreground italic font-serif leading-relaxed border-l-2 border-primary/40 pl-4 py-1">
                "{blog.excerpt}"
              </p>
            )}

            {/* Author & Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-b border-border/70 py-3.5 bg-card/40 rounded-xl px-4 backdrop-blur-xs">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shadow-2xs">
                  {blog.author?.name?.charAt(0) || <User className="h-4 w-4" />}
                </div>
                <span className="font-semibold text-foreground">
                  {blog.author?.name || "Satinder Singh Sall"}
                </span>
              </div>

              <span className="text-border">•</span>

              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary/80" />
                {new Date(
                  blog.publishedAt || blog.createdAt,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <span className="text-border">•</span>

              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary/80" />
                {calculateReadTime(blog.content)} min read
              </span>

              <span className="text-border">•</span>

              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-primary/80" />
                {blog.views || 0} reads
              </span>
            </div>
          </header>

          {/* Cover Image Banner */}
          {blog.coverImage && (
            <div className="rounded-3xl overflow-hidden shadow-xl border border-border/80 bg-muted max-h-[480px] relative group">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              />
            </div>
          )}

          {/* Article Body Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-relaxed text-foreground/90 py-2">
            {isHtml ? (
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                className="space-y-6 [&>p]:leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:pt-4 [&>blockquote]:border-l-primary [&>blockquote]:italic"
              />
            ) : (
              <p className="whitespace-pre-wrap leading-relaxed">
                {blog.content}
              </p>
            )}
          </div>

          {/* Footer / Author Sign-off Box */}
          <footer className="pt-10 border-t border-border/80 mt-16 space-y-8">
            <div className="p-6 rounded-3xl bg-card/80 border border-border/80 shadow-xs backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 flex items-center justify-center text-primary font-serif font-black text-xl shadow-2xs shrink-0">
                {blog.author?.name?.charAt(0) || "S"}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-lg text-foreground">
                  Written by {blog.author?.name || "Satinder Singh Sall"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                  Curator, writer, and thinker exploring expression through
                  verse, philosophical essays, and quiet literary observations.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
