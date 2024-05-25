import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient({
  dataProxy: true,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  const session = await req;
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  console.log('Session:', session);
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
	  max_tokens: 150,
    stream: true,
    messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: async () => {
      // This callback is called when the stream starts
      // You can use this to save the prompt to your database
      // const prompt = messages[messages.length - 1].content;
      // const newChat = await prisma.chat.create({
      //   data: {
      //     chat_title: 'New Chat Title',
      //     userId: session.user?.id || '' // Ensure userId is of type string
      //     //messages: [] // No need to explicitly specify an empty array
      //   },
      // });
      // console.log('New chat created:', newChat);

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
      console.log(completion);
    },
  });
  
  return new StreamingTextResponse(stream);
}