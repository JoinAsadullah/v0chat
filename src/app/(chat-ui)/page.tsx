'use client'
import PromptMessage from "@/components/prompt-message"
import { ChatContext } from "@/components/chat-context"
import { useContext } from "react";

export default function Home() {
  const { messages } = useContext(ChatContext)

  if (messages.length === 0) {
    return (
      <main  className="" >
        <h1>Welcome to v0 GPT</h1>
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