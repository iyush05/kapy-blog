"use client";

interface PostViewerProps {
  title: string;
  content: string;
}

export default function PostViewer({ title, content }: PostViewerProps) {
  return (
    <article className="prose prose-lg max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        {title}
      </h1>
      <div
        className="post-content text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <style jsx global>{`
        .post-content {
          font-family: 'Inter', system-ui, sans-serif;
        }
        .post-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          font-size: 1.05rem;
        }
        .post-content h2,
        .post-content h3,
        .post-content h4 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          color: #111827;
        }
        .post-content img {
          display: block;
          margin: 2rem auto;
          border-radius: 0.5rem;
          max-width: 100%;
          height: auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .post-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        .post-content strong {
          font-weight: 600;
        }
        .post-content em {
          font-style: italic;
        }
        .post-content ul,
        .post-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .post-content blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1rem;
          color: #4b5563;
          font-style: italic;
          margin: 1.5rem 0;
        }
      `}</style>
    </article>
  );
}
