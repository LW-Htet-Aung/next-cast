'use client'
import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

type Props = {}
const NavbarRoutes = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const isInstructorPage = pathname?.startsWith('/instructor')
    const isStudentPage = pathname?.includes('/chapter')
    return (
        <div className="flex gap-x-2 ml-auto">
            {isInstructorPage || isStudentPage ?
                <Link href='/dashboard' >
                    <Button size='sm' variant='ghost'>
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
                :
                <Link href='instructor/courses' >
                    <Button size='sm' variant='ghost'>
                        Instructor Mode
                    </Button>
                </Link>}
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}
export default NavbarRoutes