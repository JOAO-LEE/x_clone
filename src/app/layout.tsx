import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar/Sidebar";
import News from "@/components/News/News";
import SearchBar from "@/components/SearchBar/SearchBar";
import "./globals.css";
import { SessionWrapper } from "@/components/SessionWrapper/SessionWrapper";
import CommentModal from "@/components/ReplyModal/ReplyModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Clone",
  description: "An X clone made using TypeScript, Next.js 14 and Tailwind CSS.",
};

export const dynamic = "force-dynamic"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex justify-between max-w-6xl mx-auto">
            <div className="hidden sm:inline border-r h-screen sticky top-0">
              <Sidebar />
            </div>
            <div className="w-2xl flex-1">
              {children}
            </div>
            <div className="hidden lg:flex lg:flex-col p-3 h-screen border-l w-[24rem]">
              <SearchBar />
              <News />
            </div>
          </div>
          <CommentModal />
        </body>
      </html>
    </SessionWrapper>
  );
}
