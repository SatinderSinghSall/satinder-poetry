import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PoemDetail() {
  const { id } = useParams();
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const { data } = await axios.get(
          `https://full-stack-poetry-management-system.onrender.com/api/poems/${id}`
        );
        setPoem(data);
      } catch (error) {
        console.error("Error fetching poem:", error);
      }
    };

    fetchPoem();
  }, [id]);

  if (!poem) {
    return <p className="text-center text-muted">Loading...</p>;
  }

  // Format date and time
  const formattedDate = new Date(poem.createdAt).toLocaleString();

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center display-4">{poem.title}</h1>
      <p className="text-center text-muted">By {poem.author}</p>
      <p className="text-center text-muted">
        <small>Created on: {formattedDate}</small>
      </p>
      <div className="mt-4 p-4 border rounded shadow-sm bg-light">
        <p className="lead poem-text">{poem.content}</p>
      </div>

      {/* Inline CSS */}
      <style>
        {`
          .poem-text {
            white-space: pre-line;
            font-size: 1.2rem;
            font-family: 'Georgia', serif;
            line-height: 1.6;
          }
        `}
      </style>
    </div>
  );
}
