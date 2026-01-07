import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Bar Bhangra | Indian Restaurant & Bar in Finland",
    template: "%s | Bar Bhangra",
  },
  description:
    "Bar Bhangra is a premium Indian restaurant and bar in Finland, offering authentic Indian cuisine, signature cocktails, and a vibrant dining experience.",
  keywords: [
    "Bar Bhangra",
    "Indian Restaurant Finland",
    "Indian Bar Finland",
    "Best Indian Food Finland",
    "Restaurant in Finland",
    "Bar and Grill Finland",
  ],
  authors: [{ name: "Bar Bhangra" }],
  creator: "Bar Bhangra",
  openGraph: {
    title: "Bar Bhangra | Indian Restaurant & Bar",
    description:
      "Experience authentic Indian flavors, handcrafted cocktails, and a vibrant ambiance at Bar Bhangra, Finland.",
    url: "https://bar-bhangra.vercel.app/",
    siteName: "Bar Bhangra",
    images: [
      {
        url: "/event1.jpg",
        width: 1200,
        height: 630,
        alt: "Bar Bhangra Restaurant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
