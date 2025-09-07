"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { VersionSwitcher } from "@/components/version-switcher"

const data = {
  versions: ["1.0.1"],
  navMain: [
    {
      title: "Basic Info",
      items: [
        { title: "About SafetyFirst", url: "/dashboard" },
        { title: "Uses", url: "/dashboard/uses" },
      ],
    },
    {
      title: "Safety Hub",
      items: [
        { title: "Temp Mail Generator", url: "/dashboard/tempmail" },
        { title: "Password Strength Checker", url: "/dashboard/password-checker" },
        { title: "User Reports", url: "/dashboard/user-report" },
      ],
    },
    {
      title: "Learning",
      items: [
        { title: "Cybersecurity Quiz", url: "/dashboard/quiz" },
        { title: "Articles", url: "/dashboard/articles" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
