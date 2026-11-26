// This post was removed for good and has no replacement. Answer 410 Gone so search engines
// drop the URL. Redirecting it to the post list made Google treat it as a soft 404.
const gone = () =>
  new Response("This post has been removed.", {
    status: 410,
    headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" },
  });

export const GET = gone;
export const HEAD = gone;
