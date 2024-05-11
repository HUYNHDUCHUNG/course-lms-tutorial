"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {  LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
export const NavbarRoute = () => {
    const pathname = usePathname();
    const route = useRouter();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chaper");
    const isSearchPage = pathname === "/search";
    return(
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput/>
            </div>
        )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isPlayerPage ? (
                    <Link href="/" >
                        <Button size="sm" variant="ghost">
                            <LogOut className="w-4 h-4 mr-2"/>
                            Exit
                        </Button>
                    </Link>
                    
                ):(
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Teacher mode
                        </Button>
                    </Link>
                )}
                <UserButton
                afterSignOutUrl="/"
                />
            </div>
        </>
    )
}