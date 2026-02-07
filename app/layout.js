import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { JsonLd, personSchema, webSiteSchema } from "@/lib/jsonLd";
import { getBasics } from "@/lib/resume";

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

const siteDescription =
  "Engineering scalable platforms, developer golden paths, and Kubernetes infrastructure with modern IaC.";

export const metadata = {
  metadataBase: new URL("https://yashrajdighe.in"),
  title: {
    template: "%s | Yashraj Dighe",
    default: "Yashraj Dighe | Senior Cloud/Platform Engineer",
  },
  description: siteDescription,
  authors: [{ name: "Yashraj Dighe", url: "https://yashrajdighe.in" }],
  keywords: [
    "Yashraj Dighe",
    "Senior Cloud Engineer",
    "Platform Engineer",
    "DevOps Engineer",
    "Kubernetes",
    "AWS",
    "Infrastructure as Code",
    "Terraform",
    "CI/CD",
    "Cloud Architecture",
    "Site Reliability Engineering",
    "SRE",
    "Platform Engineering",
    "Golden Path",
    "Developer Experience",
  ],
  alternates: {
    canonical: "https://yashrajdighe.in/",
  },
  openGraph: {
    title: "Yashraj Dighe | Senior Cloud/Platform Engineer",
    description: siteDescription,
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
    description: siteDescription,
    images: ["/og.png"],
  },
};

export default async function RootLayout({ children }) {
  const basics = await getBasics();

  return (
    <html lang="en">
      <head>
        <JsonLd data={personSchema(basics)} />
        <JsonLd data={webSiteSchema()} />
      </head>
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
