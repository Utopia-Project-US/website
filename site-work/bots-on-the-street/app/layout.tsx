import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bots on the Street | Redrafting America",
  description:
    "We asked ten artificial intelligences one very human question. They had thoughts. Some wrote books.",
  icons: {
    icon: "/redrafting-america-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
