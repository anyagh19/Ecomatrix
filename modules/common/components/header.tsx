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

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Inventory",
        href: "/inventory",
        description:
            "For sighted users to preview content available behind a link.",
    },
    //   {
    //     title: "Progress",
    //     href: "/docs/primitives/progress",
    //     description:
    //       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    //   },
    //   {
    //     title: "Scroll-area",
    //     href: "/docs/primitives/scroll-area",
    //     description: "Visually or semantically separates content.",
    //   },
    //   {
    //     title: "Tabs",
    //     href: "/docs/primitives/tabs",
    //     description:
    //       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    //   },
    //   {
    //     title: "Tooltip",
    //     href: "/docs/primitives/tooltip",
    //     description:
    //       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    //   },
]


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
                </NavigationMenu>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger> <LuCircleUser className="text-2xl" /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {!user ? (
                            <Button asChild>
                                <Link href="/sign-in">Login</Link>
                            </Button>
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

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

export default Header
