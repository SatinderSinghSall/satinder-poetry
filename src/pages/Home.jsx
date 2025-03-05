import { Link } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";
import { useState, useEffect } from "react";

export default function Home() {
  const [heading, setHeading] = useState("✨ Featured Poems");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeading((prev) =>
        prev === "✨ Featured Poems" ? "Coming Soon..." : "✨ Featured Poems"
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Hero Section */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container-fluid">
          <h1 className="fw-bold display-3 display-md-5">📜 Poetry Web</h1>
          <p className="lead fst-italic">"Words that touch the soul..."</p>
          <p>- Satinder Singh Sall</p>
          <Link to="/poems" className="btn btn-light btn-lg mt-3 shadow">
            Explore Poems
          </Link>
          <h2 className="mt-4 fs-4">
            A Satinder's Original Poetry Collections 📝
          </h2>
        </div>
      </section>

      {/* Featured Poems */}
      <section className="container my-5">
        <h2 className="text-center text-secondary fw-bold">{heading}</h2>
        <div className="row mt-2 row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {[
            { id: 1, title: "Whispers of the Wind", author: "Emily Rose" },
            { id: 2, title: "The Midnight Sun", author: "John Doe" },
            { id: 3, title: "Echoes of Love", author: "Sarah Lynn" },
          ].map((poem) => (
            <div className="col" key={poem.id}>
              <div className="card border-0 shadow-lg rounded-4 h-100">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">"{poem.title}"</h5>
                  <p className="card-text text-muted">By {poem.author}</p>
                  <Link
                    to={`/poems/${poem.id}`}
                    className="btn btn-outline-dark"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-5">
        <div className="container text-center">
          <h2 className="text-secondary fw-bold">📖 About Poetry Web</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            A haven for poetry lovers, where words dance and emotions flow.
            Discover poems that resonate with your heart and share your own
            creations.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container my-5">
        <h2 className="text-center text-secondary fw-bold">
          💬 What Our Readers Say
        </h2>
        <div className="text-center">
          <blockquote className="blockquote bg-light p-4 rounded-4 shadow w-75 w-md-50 mx-auto">
            <p className="mb-0 fst-italic">
              "This platform has reignited my love for poetry!"
            </p>
            <footer className="blockquote-footer mt-2">Anna Thompson</footer>
          </blockquote>
        </div>
      </section>

      {/* Contribute Your Poem */}
      <section className="text-center my-5">
        <h2 className="text-secondary fw-bold">🖋️ Share Your Poem With Us</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Do you have a poem to share? Join our community and let your words
          inspire others.
        </p>
        <Link to="/submit" className="btn btn-success btn-lg mt-3 shadow">
          Submit Your Poem
        </Link>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Social Media Links */}
      <section className="text-center my-5">
        <h2 className="text-secondary fw-bold">🌎 Connect with Us</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          <a href="https://twitter.com" className="btn btn-outline-info shadow">
            Twitter
          </a>
          <a
            href="https://facebook.com"
            className="btn btn-outline-primary shadow"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            className="btn btn-outline-danger shadow"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
