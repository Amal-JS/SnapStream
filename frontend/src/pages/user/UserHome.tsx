import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { useAppSelector } from "../../hooks/redux"
import { postPath } from "../../utils/url";
import { Post } from "./Post/Post";
import { SideNav } from "./SideNav";
import { UserHomeStatus } from "./status/UserHomeStatus";
import { customErrorToast } from "../../Toast";

interface PostData {
    id:string,
}

 const UserHomeComponent = ()=> {
    const userLoggedIn = useAppSelector((state)=>state.user)
    const [posts,setPosts] = useState<PostData[] | []>()
  
    const fetchUserPosts = async ()=>{
        const response = await axiosInstance.get(postPath+`post/?userId=${userLoggedIn.userId}`)
        if(response.data.posts && response.status === 200){
            
            setPosts(response.data.posts)
        }else{
            customErrorToast('Error fetching posts.')
        }
    }

    useEffect(()=>{
        fetchUserPosts()
    },
    [])
    return (
        
        <div className=" md:pl-40 md:mt-3">
            <UserHomeStatus />
        <div className="flex w-full h-screen p-3 mt-5 md:mt-3">
            <div className="w-full md:w-5/12 p-1 md:p-5 md:ml-36 bg-secondary dark:bg-primary  md:border-r-3 border-r-secondary-border dark:border-r-primary-border flex-col justify-center">
           {posts && posts?.length > 0 ? 
           posts.map(post=>{
            return <Post  key={post.id} postData={post}/>
           })
           :
           <p className="text-xl text-primary mt-8 dark:text-secondary text-center md:text-start">No new posts to show.</p>
           }
            </div>
            <div className="hidden px-4 md:flex md:justify-center w-7/12" >
                <p>fasdfasdfsdfsd</p>
            </div>
        </div>
        </div>
    )
}

export const UserHome = ()=>{
    return <SideNav><UserHomeComponent/></SideNav>
}