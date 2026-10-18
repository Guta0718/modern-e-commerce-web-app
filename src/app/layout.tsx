import type { Metadata } from "next";
import "./globals.css";
import {Navbar} from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Gebeya E-Commerce",
  description: "Modern Market from where you are",
};

export default function RootLayout( {children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="antialiased"
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8"> 
              {children} 
          </main>
      </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
