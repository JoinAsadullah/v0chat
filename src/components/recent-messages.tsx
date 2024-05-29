import { PrismaClient } from '@prisma/client'


export default async function Recent({chatId}: {chatId: string}) {
    const prisma = new PrismaClient()

        const messages = await prisma.message.findMany(
            {
                where: {
                    chatId: chatId
                },
            }
        )


    return (
                <div
            className="flex-1 rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7"
        >
        {messages.map((message) =>(
            <span key={message.id}>
                <div className="flex flex-row px-2 py-4 sm:px-4">
                    <img
                        className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                        src="https://dummyimage.com/256x256/363536/ffffff&text=Y"
                    />

                    <div className="flex max-w-3xl items-center">
                        <p>{message.prompt}</p>
                    </div>
                </div>

                <span>
                   
                            <div
                                className="mb-4 flex rounded-xl bg-slate-100 px-2 py-6 dark:bg-slate-900 sm:px-4"
                            >
                                <img
                                    className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                                    src="https://dummyimage.com/256x256/354ea1/ffffff&text=v0"
                                />

                                <div className="flex max-w-3xl items-center rounded-xl">
                                    <p>{message.assistant}</p>
                                </div>
                            </div>
                        </span>

            </span>
        ))}
        </div>
    ) 
}
