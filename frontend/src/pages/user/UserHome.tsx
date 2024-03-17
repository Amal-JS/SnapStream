import { useAppSelector } from "../../hooks/redux"
import { SideNav } from "./SideNav";

 const UserHomeComponent = ()=> {
    const userLoggedIn = useAppSelector((state)=>state.user.userLoggedIn)
    if (userLoggedIn){
        console.log('user logged in');
        
    }else{
        console.log('not logged in ');
        
    }
    return (
        <div className="p-3 md:pl-56">
            <h1 className="text-8xl text-black dark:bg-black dark:text-white">Home</h1>
        </div>
    )
}

export const UserHome = ()=>{
    return <SideNav><UserHomeComponent/></SideNav>
}