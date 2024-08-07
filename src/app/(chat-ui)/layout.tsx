import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidePanel from "@/components/side-panel";
import PromptInput from "@/components/prompt-input";
import ChatContextProvider from "@/components/chat-context";
import {auth} from "@/auth";
import prisma from "@/prisma";
import LandingPage from "@/components/landing-page";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {  
  const session = await auth();

  if(!session) {
    return <html className="" lang="en"><body><LandingPage/></body></html>
  }



  const prechats = await prisma?.chat.findMany(
    {
        where: {
            userId: session?.user?.id || ""
        },
        orderBy: {
          createdAt: 'desc'
        }
    }
  ) || [];

  return (
    <html className="" lang="en">
      <ChatContextProvider>
      <body className={`h-svh relative bg-slate-200 dark:bg-slate-800 ${inter.className}`}>
        <div className="flex max-h-svh">
          <div className="max-md:absolute">
            <SidePanel session={session} prechats={prechats} />
          </div>
          <div className="min-h-svh justify-between w-full flex flex-col">
            <SessionProvider session={session}>
              {children}
            </SessionProvider> 
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
