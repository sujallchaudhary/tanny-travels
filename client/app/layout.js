import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Tanny Travels",
  description: "Tanny Travels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

