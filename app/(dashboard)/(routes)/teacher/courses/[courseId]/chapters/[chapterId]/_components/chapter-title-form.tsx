"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import { Form, FormField, FormDescription, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(1)
})

interface ChapterTitleFormProps {
    initialData:{
        title: string;
    };
    courseId: string;
    chapterId: string;
}
export const ChapterTitleForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterTitleFormProps) =>{

    const [isEditting, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:   zodResolver(formSchema),
        defaultValues: initialData,
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
                Chapter title
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditting ? (
                            <>Cancel</>
                        ):(
                            <>
                                <Pencil className="h-4 w4 mr-2"/>
                                Edit title
                            </>
                        )}
                    
                </Button>
            </div>
            {!isEditting && (
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            )}

            {isEditting && (
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                    >
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Introduction to the course"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
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