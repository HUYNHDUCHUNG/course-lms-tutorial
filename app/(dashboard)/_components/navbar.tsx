import { NavbarRoute } from "@/components/navbar-route"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebar/>
            <NavbarRoute/>
        </div>
    )
}