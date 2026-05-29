// Single source of truth for product branding.
// Modify these values to rebrand the entire app in one place.

export const brand = {
  name: "CommentFlow",
  short: "CF",
  tagline: "Turn Instagram Comments Into Conversations",
  description:
    "Premium automation that converts every comment into a personal DM in milliseconds.",
  // Built-by credit shown in the top bar + footer.
  // Change this once here to rebrand the whole app.
  creator: {
    label: "Built by Sumit",
    name: "Sumit",
    url: "", // optional — your portfolio / twitter / linkedin
  },
  // Aurora palette — Indigo → Fuchsia → Amber
  colors: {
    primary: "#6366F1", // indigo-500
    secondary: "#D946EF", // fuchsia-500
    accent: "#F59E0B", // amber-500
  },
  social: {
    docsUrl: "https://developers.facebook.com/docs/instagram-platform",
  },
} as const;

export type Brand = typeof brand;
