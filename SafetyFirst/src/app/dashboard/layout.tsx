import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="dark">
      <AppSidebar/>
      <SidebarInset className="text-white">
        {children}
      </SidebarInset>
    </SidebarProvider>
    
  )
}
