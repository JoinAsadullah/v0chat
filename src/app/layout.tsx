import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidePanel from "../components/side-panel";
import PromptInput from "../components/prompt-input";
import ChatContextProvider from "./chat-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="" lang="en">
      <ChatContextProvider>
      <body className={`h-svh relative bg-slate-200 dark:bg-slate-800 ${inter.className}`}>
        <div className="flex max-h-svh">
          <div className="">
            <SidePanel />
          </div>
          <div className="min-h-svh justify-between w-full flex flex-col">
            {children}
            <div className="w-full pr-[8px]">
              <div className="p-4 w-full md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] mx-auto">
                <PromptInput />
              </div>
            </div>
          </div>
        </div>
      </body>
      </ChatContextProvider>
    </html>
  );
}
