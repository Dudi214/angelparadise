import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const font = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Angel Paradise | Passeios de Lancha e Barco Privativo em Angra dos Reis",
    template: "%s | Angel Paradise",
  },
  description:
    "Aluguel de lanchas e passeios privativos em Angra dos Reis e Ilha Grande. Roteiros exclusivos, conforto e segurança para sua família. Reserve seu passeio!",
  keywords: [
    "Passeio de lancha Angra dos Reis",
    "Aluguel de barco Angra dos Reis",
    "Passeio privativo Ilha Grande",
    "Lancha privativa Angra",
    "Angel Paradise Angra",
    "Roteiros de lancha Angra",
  ],
  authors: [{ name: "Angel Paradise" }],
  creator: "Angel Paradise",
  metadataBase: new URL("https://angelparadise.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Angel Paradise | Passeios Privativos em Angra dos Reis",
    description:
      "A melhor experiência em passeios de lancha privativos em Angra dos Reis e Ilha Grande. Viva momentos inesquecíveis!",
    url: "https://angelparadise.vercel.app",
    siteName: "Angel Paradise",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Angel Paradise - Passeios de Lancha em Angra dos Reis",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo.png?v=2", type: "image/png" },
    ],
    shortcut: "/logo.png?v=2",
    apple: "/logo.png?v=2",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${font.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}