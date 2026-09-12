export default function sitemap() {
  const baseUrl = "http://localhost:3000";

  const staticPages = [
    "",
    "/games",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  const gamePages = [
    "/games/reaction-time",
    "/games/sequence-memory",
    "/games/speed-math",
    "/games/word-scramble",
    "/games/odd-one-out",
    "/games/color-match",
    "/games/number-memory",
    "/games/tile-memory",
    "/games/logic-sequence",
    "/games/quick-count",
    "/games/pattern-recall",
    "/games/daily-brain-challenge",
  ];

  return [...staticPages, ...gamePages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/games"
        ? 0.9
        : path.startsWith("/games/")
        ? 0.8
        : 0.6,
  }));
}