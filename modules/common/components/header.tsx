"use client"

import * as React from "react"
import Link from "next/link"


import {
    NavigationMenu,
    
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,

    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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
    return (
        <div>
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

                </NavigationMenuList>
            </NavigationMenu>
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
