import { useState } from "react"

export const useModal = (initialState : boolean = false) => {
    const [isModalOpened,setModalToggle] = useState(initialState)
    const handleModalToggle = () => {
        setModalToggle((prev) => !prev)
    }
    return {isModalOpened,handleModalToggle}
}