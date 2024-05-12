"use client"

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


interface CourseEnrollButtonProps{
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({
    price,
    courseId
}:CourseEnrollButtonProps) =>{

    const [isLoading, setisLoading] = useState(false)

    const onClick = async () =>{
        try {
            setisLoading(true)
            const response = await axios.post(`/api/courses/${courseId}/checkout`)
            window.location.assign(response.data.url)
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
            setisLoading(false)
        }
    }
    
    return(
        <Button
        onClick={onClick}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto"
        >
            Enroll for {formatPrice(price)}
        </Button>
    )
}