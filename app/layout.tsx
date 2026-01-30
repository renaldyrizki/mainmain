import type { Metadata } from "next";
import { AudioProvider } from "@/contexts/AudioContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import AudioButton from "@/components/AudioButton";
import VinylPlayer from "@/components/VinylPlayer";
import { FormProvider } from "@/contexts/FormContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HAYU MAIN HAHA!",
  description: "Project Mengisi Waktu Luang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AudioProvider>
          <FormProvider>
            {children}
            <VinylPlayer />
          </FormProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
