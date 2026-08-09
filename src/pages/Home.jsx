import { Helmet } from "react-helmet-async";

import Hero from "../components/home/Hero";
import FeaturedPoems from "../components/home/FeaturedPoems";
import About from "../components/home/About";
import Testimonial from "../components/home/Testimonial";
import CTA from "../components/home/CTA";
import SocialLinks from "../components/home/SocialLinks";
import NewsletterSignup from "./NewsletterSignup";
import StoriesSection from "../components/home/StoriesSection";
import AboutMeCTA from "@/components/AboutMeCTA";
import { SuggestBookCallout } from "@/components/home/SuggestBookCallout";
import AddPoemCTA from "@/components/home/AddPoemCTA";
import UniversalNavigationCTA from "@/components/UniversalNavigationCTA";
import BlogNavigationCTA from "@/components/BlogNavigationCTA.jsx";
import NewsletterCTA from "@/components/NewsletterCTA";

export default function Home() {
  const websiteUrl = "https://satinderpoetry.com";
  const pageTitle =
    "Satinder Poetry – Poems, Stories, Essays & Creative Writing | Satinder Singh Sall";
  const pageDescription =
    "Explore original poetry, short stories, essays, and creative writing by Satinder Singh Sall. A digital collection of human experiences, emotions, and quiet reflections.";
  const ogImageUrl = `${websiteUrl}/assets/images/main-background.jpg`;

  return (
    <>
      {/* Dynamic SEO Head Management */}
      <Helmet>
        {/* Basic Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Satinder Singh Sall, Satinder Poetry, Satinder Singh poetry, poems, short stories, essays, creative writing, poetry collection, literature blog, contemporary poetry"
        />
        <meta name="author" content="Satinder Singh Sall" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={websiteUrl} />

        {/* Open Graph / Facebook / WhatsApp / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={websiteUrl} />
        <meta
          property="og:title"
          content="Satinder Poetry | Creative Writing & Poems by Satinder Singh Sall"
        />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content="Satinder Poetry Banner" />
        <meta property="og:site_name" content="Satinder Poetry" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={websiteUrl} />
        <meta
          name="twitter:title"
          content="Satinder Poetry | Poems & Creative Writing"
        />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      {/* Structured Data (JSON-LD) for Search Engine Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Satinder Poetry",
              url: websiteUrl,
              author: {
                "@type": "Person",
                name: "Satinder Singh Sall",
              },
              description: pageDescription,
              potentialAction: {
                "@type": "SearchAction",
                target: `${websiteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Satinder Singh Sall",
              alternateName: "Satinder Poetry",
              url: websiteUrl,
              jobTitle: ["Author", "Poet", "Full-Stack Developer"],
              sameAs: ["https://satinder-portfolio.vercel.app/"],
            },
          ]),
        }}
      />

      {/* Main Page Layout using Semantic HTML */}
      <main className="bg-slate-50 text-slate-800">
        <Hero />
        <AboutMeCTA />
        <UniversalNavigationCTA />
        <StoriesSection />
        <AddPoemCTA />
        <BlogNavigationCTA />
        <SuggestBookCallout />
        <NewsletterCTA />
        <FeaturedPoems />
        <About />
        <Testimonial />
        <CTA />
        <NewsletterSignup />
        <SocialLinks />
      </main>
    </>
  );
}
