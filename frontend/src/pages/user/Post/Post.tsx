import { PostHeader } from "./PostHeader"

export const Post = ()=>{

    return (
        <div className="w-full ">
            <PostHeader />
            {/* media file */}
            <div className="h-96 md:h-[600px]">
            <img className="w-full  h-full object-cover text-center sm:mb-3 md:mb-2 hover:cursor-pointer " 
                 alt="profile picture"
                 src={ "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
              }
                  />
            </div>
        </div>
    )
}