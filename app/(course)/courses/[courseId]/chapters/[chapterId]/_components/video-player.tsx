"use client"

import MuxPlayer from "@mux/mux-player-react"
import { useConfettiStore } from "@/hook/use-confetti-store"
import { Loader2, Lock } from "lucide-react";



interface VideoPlayerProps{
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
}


export const VideoPlayer = ({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
}:VideoPlayerProps) =>{
    return(
        <div className="relative aspect-video">
            {!isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
                </div>
            )}

            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8"/>
                    <p className="text-sm">
                        This chapter is locked
                    </p>
                </div>
            )}
        </div>
    )
}

