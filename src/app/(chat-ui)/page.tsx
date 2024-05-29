'use client'
import PromptMessage from "@/components/prompt-message"
import { ChatContext } from "@/components/chat-context"
import { useContext } from "react";

export default function Home() {
  const { messages } = useContext(ChatContext)

  if (messages.length === 0) {
    return (
      <main  className="h-full" >
        <div className="flex h-full w-full flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
  <div className="mb-8 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-[#6366f1]"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
    <h1 className="ml-2 text-3xl font-bold text-[#6366f1]">V0 GPT</h1>
  </div>
  <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
    <div className="bg-slate-50 dark:bg-slate-900 p-4 shadow-md transition-transform hover:scale-105 rounded-md text-slate-800 dark:text-slate-200">
      <h3 className="text-md font-md">
        Explain nostalgia to a kindergartener
      </h3>
    </div>
    <div className="bg-slate-50 dark:bg-slate-900 p-4 shadow-md transition-transform hover:scale-105 rounded-md text-slate-800 dark:text-slate-200">
      <h3 className="text-md font-md">
        What to do with kids' art
      </h3>
    </div>
    <div className="bg-slate-50 dark:bg-slate-900 p-4 shadow-md transition-transform hover:scale-105 rounded-md text-slate-800 dark:text-slate-200">
      <h3 className="text-md font-md">
        Email for plumber quote
      </h3>
    </div>
    <div className="bg-slate-50 dark:bg-slate-900 p-4 shadow-md transition-transform hover:scale-105 rounded-md text-slate-800 dark:text-slate-200">
      <h3 className="text-md font-md">
        Make me a personal webpage.
      </h3>
    </div>
  </div>
</div>

      </main>
    );
  }
  else{
  return (
    <main  className="overflow-y-scroll" >
      <div id="scroll-0" className=" md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] mx-auto">
        <PromptMessage />
      </div>
    </main>
  );
}
}