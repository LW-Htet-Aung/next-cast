import Image from "next/image"
type Props = {}
const Logo = (props: Props) => {
    return (
        <div className="flex items-center gap-1">
            <Image src='/assets/logo.svg' width={35} height={35} alt="logo" />
            <p className="font-semibold text-2xl">NextCast</p>
        </div>
    )
}
export default Logo