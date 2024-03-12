import { useAppSelector } from "../hooks/redux"

export const UserHome = ()=> {
    const userLoggedIn = useAppSelector((state)=>{
        console.log(state);
        
    })
    // if (userLoggedIn){
    //     console.log('user logged in');
        
    // }else{
    //     console.log('not logged in ');
        
    // }
    return (
        <div className="p-3">
            <h1 className="text-8xl text-black">Home</h1>
        </div>
    )
}