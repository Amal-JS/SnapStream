import { Spinner } from "@nextui-org/react"
import { useAppSelector } from "../../hooks/redux"

export const LoadingSpinner = ()=>{
    const darkTheme = useAppSelector(state =>state.user.darkTheme)
    return (
        <div className="flex justify-center">
        <Spinner className="text-primary dark:text-secondary " color={`${darkTheme ? 'white' : 'primary'}`}/>
        </div>
    )
}