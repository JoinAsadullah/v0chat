import { openai } from '@ai-sdk/openai';
import { streamText, StreamData } from 'ai';
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { URL } from 'url';

const prisma = new PrismaClient();

//export const runtime = 'edge'; // Restrain to use edge functions due to prisma limitation to support edge runtime.

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const session = await auth();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = new URL(req.url);
  var chatId = url.pathname.split('/').pop() || "";
  const userId = session.user?.id || "";

 console.log(messages)


  if(url.pathname=='/api/chat') {
    const newChat = await prisma.chat.create({
      data: {
        chat_title: messages[0].content,
        userId: userId
      },
    });
    chatId = newChat.id;
  }

  const recentMessages = await prisma.message.findMany(
    {
        where: {
            chatId: chatId,
            userId: userId
        },
        take: 3,
        orderBy: {
          createdAt: 'desc'
        }
    }
  )

  const formated = recentMessages.reverse().map((message) => {
    return [
      {
        role: "user",
        content: message.prompt,
      },
      {
        role: "assistant",
        content: message.assistant,
      },
    ];
  });

  const message = [...formated.flatMap(arr => arr), ...messages].slice(-7);
  const data = new StreamData();
  data.append({chatId:chatId});

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    onFinish: async ({ text, toolCalls, toolResults, finishReason, usage })=> {
      await prisma.message.create({ 
        data: {
          prompt: messages[messages.length - 1].content,
          assistant: text,
          chatId: chatId,
          userId: userId
        },
      });


      data.close();
    },
    messages:message,
    maxTokens: 100,


  });

  return result.toDataStreamResponse({ data });

  //hint   return new StreamingTextResponse(stream,{status: 200,    headers: { referer: "referer" },});
  // https://sdk.vercel.ai/docs/reference/stream-helpers/streaming-text-response#init-status
  // https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat#returns
}