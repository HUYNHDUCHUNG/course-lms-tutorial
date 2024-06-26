import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { InfoCard } from "./_components/info-card";
import { Clock } from "lucide-react";

export default async function  Dashboard() {
  const {userId} = auth()

  if(!userId){
    return redirect("/")
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId)
  return (
   <div className="p-6 space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InfoCard
        label="In Progress"
        numberOfItems={coursesInProgress.length}
      />
       <InfoCard
        label="Completed"
        numberOfItems={completedCourses.length}
      />
    </div>
      <CoursesList
        items={[...coursesInProgress,...completedCourses]}
      />
   </div>
  );
}
