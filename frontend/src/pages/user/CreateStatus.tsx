import { Button, ModalBody } from "@nextui-org/react"
import { CustomModal } from "../../Components/Modal/Modal"
import { ModalTitle } from "../../Components/Modal/ModalTitle"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/redux"
import { TextInput } from "../../Components/Form/TextInput"
import { PiNotePencilDuotone } from "react-icons/pi"
import axiosInstance from "../../axios/axiosInstance"
import { statusRoot } from "../../utils/url"
import { customErrorToast, customSuccessToast } from "../../Toast"

interface CreateStatePorps {
    isModalOpened:boolean,
    handleModalToggle:()=>void
}

interface StatusForm {
  description:string,
  media:File | null
}
export const CreateStatus :React.FC<CreateStatePorps>= ({isModalOpened,handleModalToggle})=>{
 
  const [formFilled,setFormFilled] = useState<boolean>(true)
    const [statusFormData,setStatusFormData] = useState<StatusForm>({
      description:'',
      media:null
    })

    const userId = useAppSelector(state => state.user.userId)
    const handleCreateStatus = ()=>{
        const createStatus = async ()=>{
          const formData = new FormData();
          if(userId){
            formData.append('user_id', userId);
            formData.append('description', statusFormData.description);
            if(statusFormData.media)
            formData.append('media', statusFormData.media);
            
          }
          
          const response = await axiosInstance.post(statusRoot + 'userStatus/', formData);
         
          
          if(response.data.statusCreationSuccess){
          
            customSuccessToast('Status created successfully.')
            console.log(response.data);
            
          }
          else{
            customErrorToast('Some error occured on status creation.')
            customErrorToast('Please try again.')
           
          }
          handleModalToggle()
        }

        createStatus()
    }
    
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = event.target;
  
      setStatusFormData((prev) => ({
          ...prev,
          [name]: name === 'media' ? files && files[0] : value,
      }));
     
      
  };
  
    
  useEffect(()=>{
       //button enable disable
       if (statusFormData['description'] == '' &&  statusFormData['media'] == null){
        setFormFilled(true)
       
      }else{
        setFormFilled(false)
      }
    },[statusFormData])

    return(
        <CustomModal isDismissable={true} modalToggle={isModalOpened}>
            <ModalTitle handleModalToggle={handleModalToggle} isDismissable={true} title="Create Status" />
            <ModalBody >

              <div className="p-3 bg-secondary dark:bg-primary">
                  <input type="file" name='media' onChange={handleChange}/>
                  <TextInput name={'description'} error=""
                  Icon={PiNotePencilDuotone}
                  placeholder="Enter a text "
                  handleChange={handleChange}
                  />
              </div>
            <Button color="primary" className="mt-3 w-full bg-blue-700 disabled:bg-common-blue disabled:cursor-not-allowed" 
              disabled={formFilled} onClick={handleCreateStatus}>
                <p className="text-base font-medium ">Create Status</p>
              </Button>
            </ModalBody>
        </CustomModal>
    )
}