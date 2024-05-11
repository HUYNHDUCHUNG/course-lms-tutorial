import { db } from "@/lib/db"


export const getProgress = async (
    userId: string,
    courseId: string,
): Promise<number> => {
    try {
        const publishedChapter = await db.chapter.findMany({
            where:{
                courseId: courseId,
                isPublished:true
            },
            select:{
                id: true
            }
        })

        const publishedChapterIds = publishedChapter.map((chapter) => chapter.id)

        const validCompleteChapters = await db.userProgress.count({
            where:{
                userId: userId,
                chapterId:{
                    in: publishedChapterIds
                },
                isComplete: true
            }
        })

        const progressPercentage = (validCompleteChapters / publishedChapterIds.length) * 100
        
        return progressPercentage
    } catch (error) {
        console.log("GET_PROGRESS",error)
        return 0
    }
}