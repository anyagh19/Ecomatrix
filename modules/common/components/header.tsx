"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { LuCircleUser } from "react-icons/lu";
import { DropdownMenuSeparator, DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"



function Header() {

    const router = useRouter();

    const [user, setUser] = useState<any>(null)
    // console.log("header", user)

    useEffect(() => {
        fetch("/api/user/current-user", {
            credentials: "include",  // 👈 very important
        })
            .then(res => res.json())
            .then(data => setUser(data.user))
            .catch(() => setUser(null));
    }, [])

    const handleLogout = async () => {
        try {
            await axios.post("/api/user/log-out", {}, { withCredentials: true }); // ✅ include cookies
            // Optionally clear any frontend state
            setUser(null); // if you have a `user` state
            router.push("/sign-in"); // redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <div className="flex w-full items-center justify-between py-3 px-4 shadow-lg">
            <div>
                <Link href={"/"}><Image src="/logo.png" alt="Company Logo" width={120} height={40} /></Link>
            </div>
            <div className="hidden md:block">
                <NavigationMenu viewport={false}>
                    {!user ?
                        (<>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/about">About</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/contact">Contact</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </>)
                        :
                        (<>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/inventory">Inventory</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/outside-processing">Outside Processing</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/manufacturing">Manufacturing</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/ready-goods">Ready Goods</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/job">Jobs</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </>)
                    }
                </NavigationMenu>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger> <LuCircleUser className="text-2xl" /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {!user ? (
                            <>
                                <DropdownMenuItem className="md:hidden">
                                    <Link href="/" className="font-semibold">Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="md:hidden">
                                    <Link href="/about" className="font-semibold">About</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="md:hidden">
                                    <Link href="/contact" className="font-semibold">Contact</Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <Button asChild>
                                    <Link href="/sign-in">Login</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <DropdownMenuLabel>Welcome, {user.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="md:hidden">
                                    <Link href="/dashboard" className="font-semibold">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="md:hidden">
                                    <Link href="/inventory" className="font-semibold">Inventory</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="md:hidden">
                                    <Link href="/outside-processing" className="font-semibold">Outside Processing</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="md:hidden">
                                    <Link href="/manufacturing" className="font-semibold">Manufacturing</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="md:hidden">
                                    <Link href="/job" className="font-semibold">Jobs</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                                </DropdownMenuItem>
                            </>
                        )}

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    )
}


export default Header
