import "./globals.css";
import { Outfit, Cormorant_Garamond } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://goldenpalmcity.in"),
  title: {
    default: "Golden Palm City — Discover Tomorrow Early",
    template: "%s | Golden Palm City",
  },
  description:
    "India's first cinematic future-land luxury experience. Premium RERA & HMDA approved villa plots in Shadnagar, Hyderabad. Starting from ₹5,000/sq.yd. A Kings Pride initiative.",
  keywords: [
    "Golden Palm City",
    "Kings Pride",
    "villa plots Shadnagar",
    "RERA approved plots Hyderabad",
    "HMDA approved",
    "luxury real estate Hyderabad",
    "Bangalore highway plots",
    "investment plots Hyderabad",
  ],
  openGraph: {
    title: "Golden Palm City — Discover Tomorrow Early",
    description:
      "A peaceful futuristic sanctuary in Shadnagar — RERA & HMDA approved. Starting ₹5,000/sq.yd.",
    url: "https://goldenpalmcity.in",
    siteName: "Golden Palm City",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Palm City — Discover Tomorrow Early",
    description: "Premium villa plots. RERA · HMDA approved. Kings Pride.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body className="grain bg-ink text-bone min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
