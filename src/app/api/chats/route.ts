import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient();


export async function GET(req: Request, res: Response) {
    const session = await auth();

    const lastChat = await prisma.chat.findMany({
        where: {
            userId: session?.user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return new Response(JSON.stringify(lastChat), { status: 200 });
}