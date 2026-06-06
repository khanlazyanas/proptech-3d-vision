import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// Adding a clean, premium font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexProp 3D | Interactive Architectural Studio",
  description: "AI-powered 3D property visualization and floor plan generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        {/* Toast Provider for ultra-professional popups */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              style: { background: '#10b981' }, // Premium Green
            },
            error: {
              style: { background: '#ef4444' }, // Premium Red
            },
          }} 
        />
        {children}
      </body>
    </html>
  );
}