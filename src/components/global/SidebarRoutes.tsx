'use client'
import { BarChart, Compass, Layout, List } from "lucide-react"
import SidebarItem from "./SidebarItem";
import useRoleCheck from "@/hooks/useRoleCheck";

type Props = {}
const guestRoutes = [
    {
        icon: Layout,
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        icon: Compass,
        label: 'Browse',
        href: '/search'
    }
]
const instructorRoutes = [{
    icon: List,
    label: 'Courses',
    href: '/instructor/courses'
}, {
    icon: BarChart,
    label: 'Analytics',
    href: '/instructor/analytics'
}
]
const SidebarRoutes = (props: Props) => {
    const isInstructorPage = useRoleCheck('/instructor')
    const routes = isInstructorPage ? instructorRoutes : guestRoutes;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    {...route}
                />
            ))}

        </div>
    )
}
export default SidebarRoutes