import "./globals.css"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Route handlers",
  description: "Route handlers example next JS v-15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
