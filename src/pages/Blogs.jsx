import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import API from "@/api/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Calendar,
  Eye,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Tag,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import AddPoemCTA from "@/components/AddPoemCTA_Main";

const POPULAR_TAGS = [
  "poetry",
  "philosophy",
  "creative-process",
  "reflections",
  "life",
];

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const searchQuery = searchParams.get("search") || "";
  const selectedTag = searchParams.get("tag") || "";
  const sortBy = searchParams.get("sort") || "newest";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: currentPage,
          limit: 6,
          sort: sortBy,
          ...(searchQuery && { search: searchQuery }),
          ...(selectedTag && { tag: selectedTag }),
        });

        const res = await API.get(`/blogs?${params.toString()}`);
        if (res.data.success) {
          setBlogs(res.data.data);
          setPagination(res.data.pagination);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchQuery, selectedTag, sortBy, currentPage]);

  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > (pagination.pages || 1)) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isFiltered = Boolean(searchQuery || selectedTag || sortBy !== "newest");

  // Dynamic SEO Title Construction based on search/filters
  const getSeoTitle = () => {
    if (searchQuery)
      return `Search: "${searchQuery}" - Blogs by Satinder Singh Sall`;
    if (selectedTag) return `#${selectedTag} Articles - Satinder Singh Sall`;
    if (currentPage > 1)
      return `Blogs & Articles (Page ${currentPage}) - Satinder Singh Sall`;
    return "Blogs & Literary Journal - Satinder Singh Sall | Poetry & Reflections";
  };

  // Canonical URL for avoiding duplicate indexing penalties
  const canonicalUrl = `${window.location.origin}/blogs${
    currentPage > 1 ? `?page=${currentPage}` : ""
  }`;

  // JSON-LD Structured Data for Google CollectionPage & Blog Search
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Satinder Singh Sall Essays & Literary Journal",
    description:
      "Explorations into poetry, creative processes, philosophy, and reflections by Satinder Singh Sall.",
    url: window.location.href,
    author: {
      "@type": "Person",
      name: "Satinder Singh Sall",
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      datePublished: blog.publishedAt || blog.createdAt,
      url: `${window.location.origin}/blogs/${blog.slug}`,
      image: blog.coverImage || "",
      description: blog.excerpt || "",
    })),
  };

  return (
    <>
      {/* Dynamic SEO Meta Tags */}
      <Helmet>
        <title>{getSeoTitle()}</title>
        <meta
          name="description"
          content="Read essays, creative processes, poetry reflections, and philosophical insights by Satinder Singh Sall."
        />
        <meta
          name="keywords"
          content="Satinder Singh Sall, poetry blog, literary journal, reflections, creative writing, philosophy, essays"
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={getSeoTitle()} />
        <meta
          property="og:description"
          content="Explorations into poetry, creative processes, philosophy, and the quiet moments between words."
        />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getSeoTitle()} />
        <meta
          name="twitter:description"
          content="Read essays and poetry insights by Satinder Singh Sall."
        />

        {/* Structured Schema.org Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Hero Section */}
          <header className="text-center space-y-4 max-w-5xl mx-auto pt-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-foreground whitespace-nowrap overflow-hidden text-ellipsis leading-tight drop-shadow-xs">
              Blogs by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-chart-1">
                Satinder Singh Sall
              </span>
            </h1>

            <div className="flex justify-center pt-1">
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold tracking-widest uppercase bg-primary/5 text-primary border-primary/20 rounded-full inline-flex items-center gap-1.5 shadow-2xs"
              >
                Reflections & Insights
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-foreground/90">
              Essays & Literary Journal
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Explorations into poetry, creative processes, philosophy, and the
              quiet moments between words.
            </p>
          </header>

          {/* Search & Filter Toolbar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-card/80 border border-border/80 shadow-xs backdrop-blur-md space-y-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Search Input Box */}
              <div className="relative w-full lg:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => updateFilters("search", e.target.value)}
                  className="pl-10 bg-background/90 border-muted/80 focus-visible:ring-primary rounded-xl transition-all"
                />
              </div>

              {/* Sort By Dropdown & Reset Action */}
              <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-2 min-w-[170px]">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Select
                    value={sortBy}
                    onValueChange={(value) => updateFilters("sort", value)}
                  >
                    <SelectTrigger className="w-full bg-background/90 border-muted/80 rounded-xl text-xs font-medium">
                      <SelectValue placeholder="Sort articles" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="newest">Latest Articles</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="popular">Most Viewed</SelectItem>
                      <SelectItem value="title">Title (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isFiltered && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="rounded-xl text-xs gap-1.5 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Topic Filter Pills */}
            <div className="pt-3 border-t border-border/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs text-muted-foreground font-medium shrink-0 flex items-center gap-1">
                <Tag className="h-3 w-3" /> Quick Topics:
              </span>
              <div className="flex items-center gap-1.5">
                {POPULAR_TAGS.map((tag) => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => updateFilters("tag", isActive ? "" : tag)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-all shrink-0 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Blog Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-3 bg-card p-4 rounded-2xl border"
                >
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 space-y-4 bg-card/40 rounded-3xl border border-dashed border-muted/80">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/60 stroke-1" />
              <h3 className="text-xl font-serif font-semibold text-foreground">
                No articles found
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                We couldn't find any published stories matching your current
                filters.
              </p>
              {isFiltered && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="mt-2 rounded-xl"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group flex flex-col bg-card rounded-2xl border border-border/60 shadow-2xs hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Image Banner */}
                  {blog.coverImage ? (
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-primary/10 via-primary/5 to-muted flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-primary/30" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Tags & Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <time dateTime={blog.publishedAt || blog.createdAt}>
                            {new Date(
                              blog.publishedAt || blog.createdAt,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          {blog.views || 0} views
                        </span>
                      </div>

                      <Link to={`/blogs/${blog.slug}`}>
                        <h2 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h2>
                      </Link>

                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {blog.excerpt ||
                          blog.content?.replace(/<[^>]*>/g, "").slice(0, 140) +
                            "..."}
                      </p>
                    </div>

                    {/* Footer & Read More */}
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.slice(0, 2).map((t) => (
                          <button
                            key={t}
                            onClick={() => updateFilters("tag", t)}
                            className="text-[11px] bg-secondary/80 hover:bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-md font-medium transition-colors"
                          >
                            #{t}
                          </button>
                        ))}
                      </div>

                      <Link
                        to={`/blogs/${blog.slug}`}
                        aria-label={`Read article: ${blog.title}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline group-hover:translate-x-0.5 transition-transform"
                      >
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Floating-Style Pagination Bar */}
          <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs text-muted-foreground font-medium flex items-center gap-2">
              <span>Showing Page</span>
              <span className="px-2.5 py-1 rounded-md bg-muted/60 text-foreground font-semibold border border-border/50">
                {currentPage} of {pagination.pages || 1}
              </span>
              <span className="text-muted-foreground/80">
                ({pagination.total || 0} articles total)
              </span>
            </div>

            <nav
              aria-label="Pagination Navigation"
              className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-card/80 border border-border/80 shadow-md backdrop-blur-md"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || loading}
                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30"
                title="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1 px-1">
                {[...Array(Math.max(1, pagination.pages || 1))].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                      className={`h-8 min-w-[32px] px-2.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center justify-center ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-2xs scale-105"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= (pagination.pages || 1) || loading}
                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30"
                title="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>

        <AddPoemCTA />
      </div>
    </>
  );
}
