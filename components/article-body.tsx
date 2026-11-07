import { Fragment, type ReactNode } from "react";

// Renders the stored paragraphs: keeps line breaks, supports **bold**,
// turns a short first line ("🚀 Heading\nBody…") into a sub-heading and
// a paragraph that is only a quotation into a pull quote.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

const isQuote = (text: string) => /^[“”"«]/.test(text) && /[“”"»]\.?$/.test(text) && text.length < 220;

export function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose-voon">
      {paragraphs.map((raw, index) => {
        const text = raw.trim();
        if (!text) {
          return null;
        }

        if (isQuote(text)) {
          return <blockquote key={index}>{inline(text)}</blockquote>;
        }

        const [first, ...rest] = text.split("\n");
        const looksLikeHeading =
          rest.length > 0 && first.length < 110 && /^\p{Extended_Pictographic}/u.test(first);
        const standaloneHeading = rest.length === 0 && text.length < 60 && !/[.!?:;,…”"]$/.test(text);

        if (standaloneHeading) {
          return (
            <h2 key={index} className="lead-line">
              {inline(text)}
            </h2>
          );
        }

        if (looksLikeHeading) {
          return (
            <Fragment key={index}>
              <h2 className="lead-line">{inline(first)}</h2>
              <p>{inline(rest.join("\n"))}</p>
            </Fragment>
          );
        }

        return <p key={index}>{inline(text)}</p>;
      })}
    </div>
  );
}
