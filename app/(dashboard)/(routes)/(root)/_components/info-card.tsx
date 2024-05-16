import { CheckCircle, Clock, LucideIcon } from "lucide-react";



interface InfoCardProps {
    numberOfItems: number;
    variant?: "default" | "success";
    label: string;
}
export const InfoCard = ({
    variant,
    numberOfItems,
    label,

}: InfoCardProps) =>{
    return(
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            {label === "Completed" ? (
                <>
                    <CheckCircle className="text-emerald-800"/>
                    <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-gray-500 text-sm">
                            {numberOfItems}
                            {numberOfItems === 1 ? " Course" : " Courses"}
                        </p>
                    </div>
                </>
            ):(
                <>
                <Clock className="text-sky-700"/>
                <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-gray-500 text-sm">
                        {numberOfItems}
                        {numberOfItems === 1 ? " Course" : " Courses"}
                    </p>
                </div>
                </>
            )}
            

        </div>
    )
}