import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar/Sidebar";
import News from "@/components/News/News";
import SearchBar from "@/components/SearchBar/SearchBar";
import "./globals.css";
import { SessionWrapper } from "@/components/SessionWrapper/SessionWrapper";
import CommentModal from "@/components/ReplyModal/ReplyModal";
import LogoutModal from "@/components/LogoutModal/LogoutModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Clone",
  description: "An X clone made using TypeScript, Next.js 14 and Tailwind CSS.",
};

export const dynamic = "force-dynamic"
// hidden sm:inline
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col-reverse lg:flex-row lg:justify-between max-w-6xl mx-auto">
            <div className="border-t w-full bg-white md:bg-transparent md:w-min md:border-r md:h-screen fixed bottom-0 md:sticky md:top-0">
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
          <LogoutModal />
        </body>
      </html>
    </SessionWrapper>
  );
}
