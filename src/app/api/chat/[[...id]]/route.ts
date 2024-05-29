import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { URL } from 'url';

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//export const runtime = 'edge';

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

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
	  max_tokens: 150,
    stream: true,
    messages:message,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: async () => {
      // This callback is called when the stream starts
      // You can use this to save the prompt to your database


      },
    // onToken: async (token: string) => {
    //   // This callback is called for each token in the stream
    //   // You can use this to debug the stream or save the tokens to your database
    //   console.log(token);
    // },
    onCompletion: async (completion: string) => {
      // This callback is called when the stream completes
      // You can use this to save the final completion to your database
      //await saveCompletionToDatabase(completion);
    await prisma.message.create({ 
      data: {
        prompt: messages[messages.length - 1].content,
        assistant: completion,
        chatId: chatId,
        userId: userId
      },
    });

    },

  });
  
  return new StreamingTextResponse(stream);
}