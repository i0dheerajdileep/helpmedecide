import { Analytics } from "@vercel/analytics/react"
import "./globals.css";


export const metadata = {
  title: "Help me decide",
  description: "A simple tool to help you make decisions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <Analytics/>
      <body>{children}</body>
    </html>
  );
}
