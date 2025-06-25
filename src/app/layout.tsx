import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/components/CartContext';
import AIChatWidget, { ChatProvider } from '@/components/AIChatWidget';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hunger - Food Delivery",
  description: "AI-powered food delivery app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white min-h-screen font-sans`}>
        <ChatProvider>
          <CartProvider>
            <Navbar />
            <div className="pt-20">{/* Add padding for fixed navbar */}
              {children}
            </div>
            
            {/* Footer with Copyright */}
            <footer className="bg-slate-900 text-white py-4 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-light tracking-tight">Hunger</span>
                    <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                    <span className="text-slate-400 font-light">Culinary Excellence</span>
                  </div>
                  
                  <div className="text-center md:text-right">
                    <p className="text-slate-400 text-sm font-light">
                      © {new Date().getFullYear()} Hunger. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-xs font-light mt-1">
                      Powered by AI • Crafted with passion
                    </p>
                  </div>
                </div>
                

              </div>
            </footer>
            
            <AIChatWidget />
          </CartProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
