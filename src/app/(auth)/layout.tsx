import { PropsWithChildren } from "react"
const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="h-full min-h-screen flex items-center justify-center">{children}</div>
    )
}
export default AuthLayout