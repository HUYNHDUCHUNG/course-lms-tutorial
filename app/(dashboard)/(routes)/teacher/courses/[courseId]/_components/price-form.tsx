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
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

const formSchema = z.object({
    price: z.coerce.number(),
})

interface PriceFormProps {
    initialData: Course;
    courseId: string;
}
export const PriceForm = ({
    initialData,
    courseId
}: PriceFormProps) =>{

    const [isEditting, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:   zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        },
    })
    
    const {isSubmitting, isValid} = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        try {
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        }
        
        
    }
    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course price
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditting ? (
                            <>Cancel</>
                        ):(
                            <>
                                <Pencil className="h-4 w4 mr-2"/>
                                Edit price
                            </>
                        )}
                    
                </Button>
            </div>
            {!isEditting && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.price && "text-slate-500 italic"
                )}>
                    {initialData.price ? formatPrice(initialData.price): "No price"}
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
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                         type="number"
                                         step="0.01"
                                        disabled={isSubmitting}
                                        placeholder="Set a price for your course"
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