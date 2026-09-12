export default function robots() {
  const baseUrl = "https://puzexa.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}