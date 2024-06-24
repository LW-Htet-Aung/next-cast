'use client'
import { useState } from "react"
type useToggleProps = [boolean, () => void]
export const useToggle = (): useToggleProps => {
    const [toggle, setToggle] = useState(false)
    const handleToggle = () => {
        setToggle(!toggle)
    }
    return [toggle, handleToggle]
}