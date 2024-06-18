import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from "./Sidebar"

type Props = {}
const MobileSidebar = (props: Props) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent overlayClassName="md:hidden" side='left' className="p-0 md:hidden bg-white">
                <Sidebar />
            </SheetContent>
        </Sheet>

    )
}
export default MobileSidebar