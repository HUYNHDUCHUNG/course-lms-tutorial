"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import MuxPlayer from "@mux/mux-player-react";

import { Form, FormField, FormDescription, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course, MuxData } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";



interface ChapterVideoFormProps {
    initialData: Chapter & {muxData: MuxData | null};
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1)
})
export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) =>{

    const [isEditting, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:   zodResolver(formSchema),
        defaultValues: {
            videoUrl: initialData?.videoUrl || "",
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
                Chapter video
                <Button onClick={toggleEdit} variant="ghost">
                    
                        {isEditting && (
                            <>Cancel</>
                        )}
                        {!isEditting && !initialData.videoUrl && (
                            <>
                                <PlusCircle
                                    className="h-4 w-4 mr-2"
                                    
                                />
                                Add an video
                            </>
                        )}
                        {!isEditting && initialData.videoUrl &&(
                            <>
                                <Pencil className="h-4 w4 mr-2"/>
                                Edit video
                            </>
                        )}
                    
                </Button>
            </div>
            {!isEditting && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md"> 
                        <Video className="h-10 w-10 to-slate-500" />

                    </div>
                ):(
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer
                            playbackId={initialData?.muxData?.playbackId || ""}
                        />
                    </div>
                )
            )}

            {isEditting && (
                <div>
                    <FileUpload
                    endpoint="chapterVideo"
                    onChange={(url) =>{
                        if(url){
                            onSubmit({videoUrl: url})
                        }
                    }}
                    />
                    <div className="text-xs to-muted-foreground mt-4">
                        Upload this chapter&apos;s video

                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditting && (
                <div className="text-xs text-muted-foreground mt-4">
                    Video can take a few minutes to process. Refresh the page if video not appear
                </div>
            )}
        </div>
    )
}