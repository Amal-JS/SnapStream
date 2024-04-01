import {Button}  from "@nextui-org/react"
interface ButtonProps{
    label:string,
    formFilled:boolean,
    handleOnClick:()=>void
}

export const CustomButton :React.FC<ButtonProps> = ({label,formFilled,handleOnClick})=>{
    return (
        <div className="w-full text-center">
  <Button className=" w-full bg-btn-enabled disabled:bg-btn-disabled disabled:cursor-not-allowed md:w-2/4"  disabled={formFilled} onClick={handleOnClick}>
  <p className="text-base font-medium text-secondary " >{label}</p>
</Button>
</div>
    )
}