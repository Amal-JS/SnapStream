import { useEffect, useState } from "react"
import { CustomModal } from "../../../Components/Modal/Modal"
import { ModalTitle } from "../../../Components/Modal/ModalTitle"
import { useModal } from "../../../hooks/useModal"
import { ModalBody } from "../../../Components/Modal/ModalBody"
import { mediaPath } from "../../../utils/url"
import { Image } from "@nextui-org/react"

interface PostData {
    id:string,
    userId:string,
    description : string,
    media : string,
    location ?: string
  }

interface PostViewProps {
    postDataUserClicked:PostData,
    openModal : boolean,

}

export const PostView : React.FC<PostViewProps>= ({postDataUserClicked,openModal})=>{
    const {isModalOpened,handleModalToggle} = useModal(true)
    const [postData,setPostData] = useState<PostData>({
        id:'',
        userId:'',
        description : '',
        media : '',
        location : ''
      })

      useEffect(()=>{
        setPostData(postDataUserClicked)
      },[])
      useEffect(()=>{
        handleModalToggle()
      },[openModal])
console.log('open post view modal state ',isModalOpened);
console.log('open post view modal state ',postData);

    return (
        <CustomModal isDismissable={true} modalToggle={isModalOpened}>
            <ModalTitle handleModalToggle={handleModalToggle} isDismissable={true}>
            </ModalTitle>
            <ModalBody>
                <div className="w-full  h-full bg-secondary dark:bg-primary">
                    <div className="p-3 flex bg-secondary dark:bg-primary"> header</div>
                    <div className="w-full bg-secondary dark:bg-primary flex justify-center">
                        <div className=" mb-3">
                        <Image
                   className="object-contain h-80  "
                   alt="profile picture"
                   src={mediaPath+`${postData.media}`}/>
                   <p className="text-primary dark:text-secondary text-center text-xl my-4 p-3">{postData.description}</p>
                        </div>

                        <div className="hidden md:block md:w-1/2 bg-secondary dark:bg-primary border-l-3 border-l-secondary-border dark:border-l-primary-border pl-7">
                            jfdjljdfljsdfljsdjflsd
                        </div>
                    </div>
                </div>
            </ModalBody>
        </CustomModal>
    )
}