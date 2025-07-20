import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import "./globals.css";

const lato = Lato({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cine Movie API",
  description: "Explore the world of movies with our API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${lato.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
