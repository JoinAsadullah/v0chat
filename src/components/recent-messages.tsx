import { PrismaClient } from '@prisma/client'
import copy from 'clipboard-copy'
const prisma = new PrismaClient()


export default async function Recent() {
        const messages = await prisma.message.findMany()
        console.log(messages)


    return (
        <>
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
        </>
    ) 
}
