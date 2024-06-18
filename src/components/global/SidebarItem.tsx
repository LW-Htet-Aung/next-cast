import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type SidebarItemProps = {
    label: string;
    icon: LucideIcon;
    href: string;
};

const SidebarItem = ({ label, href, icon: Icon }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === '/' && href === '/') || pathname === href || pathname?.startsWith(`${href}/`);

    return (
        <Link href={href}
            type="button"
            className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 ',
                isActive && 'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 border-r-4 border-sky-500'
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                {Icon && (
                    <Icon
                        size={22}
                        className={cn(
                            'text-slate-500',
                            isActive && 'text-sky-700'
                        )}
                    />
                )}
            </div>
            {label}
        </Link>
    );
};

export default SidebarItem;
