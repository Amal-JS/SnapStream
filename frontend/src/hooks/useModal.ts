import { useState } from "react"

export const useModal = (initialState : boolean = false) => {
    const [isModalOpened,setModalToggle] = useState(initialState)

    const handleModalToggle = () => {
        setModalToggle((prev) => !prev)
        console.log('modal state :',isModalOpened);
        
    }
    return {isModalOpened,handleModalToggle}
}