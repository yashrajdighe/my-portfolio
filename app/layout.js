import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://yashrajdighe.in"),
  title: "Yashraj Dighe | Senior Cloud/Platform Engineer",
  description:
    "Engineering scalable platforms, developer golden paths, and Kubernetes infrastructure with modern IaC.",
  openGraph: {
    title: "Yashraj Dighe | Senior Cloud/Platform Engineer",
    description:
      "Engineering scalable platforms, developer golden paths, and Kubernetes infrastructure with modern IaC.",
    url: "https://yashrajdighe.in",
    siteName: "Yashraj Dighe Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yashraj Dighe portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashraj Dighe | Senior Cloud/Platform Engineer",
    description:
      "Engineering scalable platforms, developer golden paths, and Kubernetes infrastructure with modern IaC.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
