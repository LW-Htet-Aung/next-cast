import Navbar from "@/components/global/Navbar"
import Sidebar from "@/components/global/Sidebar"
import { PropsWithChildren } from "react"

type Props = {}
const DashboardLayout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 md:pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}
export default DashboardLayout