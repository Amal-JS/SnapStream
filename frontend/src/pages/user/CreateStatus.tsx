import { Button, ModalBody } from "@nextui-org/react"
import { CustomModal } from "../../Components/Modal/Modal"
import { ModalTitle } from "../../Components/Modal/ModalTitle"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/redux"
import { TextInput } from "../../Components/Form/TextInput"
import { PiNotePencilDuotone } from "react-icons/pi"

interface CreateStatePorps {
    isModalOpened:boolean,
    handleModalToggle:()=>void
}

interface StatusForm {
  description:string,
  media:File | null
}
export const CreateStatus :React.FC<CreateStatePorps>= ({isModalOpened,handleModalToggle})=>{
 
    const userId = useAppSelector(state => state.user.userId)
    const handleCreateStatus = ()=>{

    }
    const [formFilled,setFormFilled] = useState<boolean>(true)
    const [formData,setFormData] = useState<StatusForm>({
      description:'',
      media:null
    })


    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
      
      const {name,value} = event.target
      if(name == 'media' && event.target.files){
        setFormData(prev => ({
          ...prev,
          [name]:event.target.files ? event.target.files[0] : null
        }))
      }
      setFormData(prev => ({
        ...prev,
        [name]:value ? value : ''
      }))

   
    }
    
  
    
  useEffect(()=>{
       //button enable disable
       if (formData['description'] == '' &&  formData['media'] == null){
        setFormFilled(true)
        console.log('enters in change');
      }else{
        setFormFilled(false)
      }
    },[formData])

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