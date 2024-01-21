import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ['latin-ext'],
  weight: ['400', '500', '700']
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Displays the weather for a given location.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        {children}
      </body>
    </html>
  );
}
