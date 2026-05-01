import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import FloatingShapes from "@/components/floatingShapes";
import Header from "@/components/Header";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO - used by Next.js for document head
// title: Browser tab title
// description: Meta description for search engines
export const metadata = {
  title: "Photon",
  description: "AI image editor",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <ConvexClientProvider>
            <Header />

            {/* Main content area
              - bg-slate-900: Dark background color
              - min-h-screen: Minimum full viewport height
              - text-white: White text color
              - overflow-x-hidden: Prevents horizontal scroll */}
            <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">
              {/* FloatingShapes: Animated gradient background shapes
                - Fixed position, covers entire viewport
                - Uses parallax effect based on scroll position
                - pointer-events-none: Allows clicking through to content */}
              <FloatingShapes />

              {/* Toaster: Global toast notification system
                - richColors: Enables colored toast messages
                - Positioned at bottom-right by default */}
              <Toaster richColors />
              {children}
            </main>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
