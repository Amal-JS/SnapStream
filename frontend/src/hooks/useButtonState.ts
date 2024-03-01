import { useState } from "react"

//hook to disable enable button
export const useButtonState = () => {

    const [formFilled,setFormFilled] = useState<boolean>(true)

    return {formFilled,setFormFilled}
}