import { useAppSelector } from "../../hooks/redux"
import { SideNav } from "./SideNav";
import { UserHomeStatus } from "./status/UserHomeStatus";

 const UserHomeComponent = ()=> {
    const userLoggedIn = useAppSelector((state)=>state.user.userLoggedIn)
    if (userLoggedIn){
        console.log('user logged in');
        
    }else{
        console.log('not logged in ');
        
    }
    return (
        <div className=" md:pl-40 md:mt-3">
            <UserHomeStatus />
        </div>
    )
}

export const UserHome = ()=>{
    return <SideNav><UserHomeComponent/></SideNav>
}