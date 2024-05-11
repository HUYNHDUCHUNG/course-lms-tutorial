import { db }  from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Badge, CircleDollarSign, File, LayoutDashboard, ListChecksIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/decription-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChapterForm } from "./_components/chapter-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";

const CourseIdPage = async ({
    params
}:{
    params: {courseId: string}
}) => {

const {userId} = auth();
    if(!userId){
        return redirect("/")
    }

    const course = await db.course.findUnique({
        where:{
            id: params.courseId,
            userId
        },
        include:{

            chapters:{
                orderBy:{
                    position: "asc"
                }
            },
            attachments:{
                orderBy:{
                    createdAt:"desc"
                }
            }
        }
    });

    const categories = await db.category.findMany({
        orderBy:{
            name:"asc",
        }
    })

    

    if(!course){
        return redirect("/")
    }


    const requidFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),

    ];

    const totalFields = requidFields.length;
    const completedFields = requidFields.filter(Boolean).length;

    const completionText = `(${completedFields}) / ${totalFields}`

    const isComplete = requidFields.every(Boolean)
    return ( 
        <>
            {!course.isPublished && (
                <Banner 
                    label="This course is unpublished. It will not be visible to students"
                    variant="warning"
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-x-2">
                        <h1 className="text-2xl font-medium">
                            Course setup
                        </h1>

                        <span className="text-sm text-slate-700">
                            Complete all fields {completionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        isPublished={course.isPublished}
                        
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <LayoutDashboard className="text-sky-700"/>
                            <h2 className="text-xl">
                                Customize your course
                            </h2>
                        </div>
                        <TitleForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <ImageForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <ListChecksIcon className="text-sky-700" />
                                <h2 className="text-xl">
                                    Course chapters
                                </h2>
                            </div>
                            <div>
                                <ChapterForm 
                                    initialData={course}
                                    courseId={course.id}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <CircleDollarSign className="text-sky-700"/>
                                <h2 className="text-xl">
                                    Sell your course
                                </h2>
                            </div>
                            <PriceForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-x-2">
                                <File className="text-sky-700"/>
                                <h2 className="text-xl">
                                    Resource & Attachments
                                </h2>
                            </div>
                            <AttachmentForm
                            initialData={course}
                            courseId={course.id}
                                />
                        </div>
                    </div>

                </div>
            </div>
        </>
     );
}
 
export default CourseIdPage;