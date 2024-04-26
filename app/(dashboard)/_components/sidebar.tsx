import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () =>{
    return(
        <div className="h-full border-r flex flex-col overflow-y-auto bg-light shadow-sm">
            <div className="p-6">
                <Logo/>
            </div>
            <div className="flex flex-col">
                <SidebarRoutes/>
            </div>
        </div>
    )
}