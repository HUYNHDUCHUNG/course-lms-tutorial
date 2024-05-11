"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import { Form, FormField, FormDescription, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Checkbox } from "@/components/ui/checkbox";


interface ChapterAccessFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}
const formSchema = z.object({
    isFree: z.boolean().default(false),
})


export const ChapterAccessForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterAccessFormProps) =>{

    const [isEditting, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:   zodResolver(formSchema),
        defaultValues: {
            isFree: !!initialData?.isFree
        },
    })
    
    const {isSubmitting, isValid} = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        }
        
        
    }
    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter access settings
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditting ? (
                            <>Cancel</>
                        ):(
                            <>
                                <Pencil className="h-4 w4 mr-2"/>
                                Edit access
                            </>
                        )}
                    
                </Button>
            </div>
            {!isEditting && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.isFree && "text-slate-500 italic"
                )}>
                   {initialData.isFree ? (
                    <>This chapter is free for preview</>
                   ):(
                    <>This chapter is not free</>
                   )}
                </div>
            )}

            {isEditting && (
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                    >
                        <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 border rounded-md p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormDescription>
                                      Check is box if you want to make this chapter for free
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

        </div>
    )
}