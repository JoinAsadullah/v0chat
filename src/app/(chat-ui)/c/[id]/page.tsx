import PromptMessage from "@/components/prompt-message"
import Recent from "@/components/recent-messages";

export default async function Home({ params } : {params: { id: string }}) {

  return (
    <main  className="overflow-y-scroll" >
      <div id="scroll-0" className=" md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] mx-auto">
        <Recent chatId={params.id} />
        <PromptMessage />
      </div>
    </main>
  );
}