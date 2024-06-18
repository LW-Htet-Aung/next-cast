import { usePathname } from "next/navigation"
const useRoleCheck = (route: string) => {

    const pathname = usePathname()

    return pathname.includes(route)
}
export default useRoleCheck