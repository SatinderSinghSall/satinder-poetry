import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowLeft,
  Search,
  Feather,
  PlusCircle,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogNotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Decorative Icon Header */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-amber-100/60 dark:bg-amber-950/40 flex items-center justify-center border border-amber-200/50 dark:border-amber-800/50 shadow-inner">
            <BookOpen className="w-10 h-10 text-amber-800 dark:text-amber-200" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-md">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-800/80 dark:text-amber-400">
            404 — Article Uncharted
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            This Post Has Left the Page
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-serif leading-relaxed px-2 max-w-md mx-auto">
            The literary piece or reflection you are searching for might have
            been moved, renamed, or remains unwritten.
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
          {/* Explore All Blogs */}
          <Button
            asChild
            className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-100 dark:text-stone-900 font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <Link
              to="/blogs"
              className="inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Explore All Blogs
            </Link>
          </Button>

          {/* Read Poems */}
          <Button
            asChild
            variant="outline"
            className="w-full border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium px-4 py-2.5 rounded-lg transition-all"
          >
            <Link
              to="/poems"
              className="inline-flex items-center justify-center gap-2"
            >
              <Feather className="w-4 h-4" />
              Read Poems
            </Link>
          </Button>

          {/* Explore Books */}
          <Button
            asChild
            variant="outline"
            className="w-full border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium px-4 py-2.5 rounded-lg transition-all"
          >
            <Link
              to="/books"
              className="inline-flex items-center justify-center gap-2"
            >
              <Book className="w-4 h-4" />
              Explore Books
            </Link>
          </Button>

          {/* Add Poem Portal */}
          <Button
            asChild
            variant="outline"
            className="w-full border-amber-300 dark:border-amber-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-medium px-4 py-2.5 rounded-lg transition-all"
          >
            <Link
              to="/add-poem-portal"
              className="inline-flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              Add Poem Portal
            </Link>
          </Button>
        </div>

        {/* Subtle Footer Quote */}
        <div className="pt-8 border-t border-stone-200/60 dark:border-stone-800/60 max-w-md mx-auto">
          <blockquote className="text-xs italic text-stone-500 dark:text-stone-400 font-serif">
            &ldquo;Not all those who wander are lost... but this article
            certainly is.&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default BlogNotFound;
