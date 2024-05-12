import { SheetContent, SheetTrigger,Sheet } from "@/components/ui/sheet"
import { Chapter, Course, UserProgress } from "@prisma/client"
import { Menu } from "lucide-react"
import { CourseSideBar } from "./course-sidebar"


interface CourseMobileSidebarProps{
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    }
    progressCount: number
}

export const CourseMobileSidebar = ({
    course,
    progressCount
}:CourseMobileSidebarProps) =>{
    return(
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <CourseSideBar
                  course={course}
                  progressCount={progressCount}
                />
            </SheetContent>
        </Sheet>
    )
}