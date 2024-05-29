import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient();


export async function GET(req: Request, res: Response) {
    const session = await auth();

        const lastChat = await prisma.chat.findFirst({
            where: {
                userId: session?.user?.id,
            },
            orderBy: { createdAt: "desc" },
        });


    return new Response(lastChat?.id, { status: 200 })
}