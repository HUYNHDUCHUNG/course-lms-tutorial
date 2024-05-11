"use client"

import { Category } from "@prisma/client"


import {
    FcMusic,
    FcMultipleDevices,
    FcSalesPerformance,
    FcOldTimeCamera,
    FcSportsMode,
    FcFilmReel,
    FcEngineering
} from "react-icons/fc"
import { IconType } from "react-icons"
import { CategoryItem } from "./category-item"
interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<Category["name"],IconType> = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering,
    "Computer Science": FcMultipleDevices
}
export const Categories = ({
    items
}: CategoriesProps) =>{
    return(
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) =>(
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}