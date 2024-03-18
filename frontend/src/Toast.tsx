import  toast, { Toaster } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { SiIfixit } from "react-icons/si";
import { useWindowSize } from './hooks/useWindowSize';
import { FaCheckCircle } from 'react-icons/fa';
import { Image } from '@nextui-org/react';

export const Toast=()=> {

    const {width} = useWindowSize()

    return(
        <Toaster  position={width < 740 ? 'top-right' : 'top-center'} 
          />
    )
}

// Custom error toast
// export const customErrorToast = (message: string, position: ToastPositionType, toastBackground: string = 'bg-white', fontColor: string = 'text-black') => {
//     toast.error(message, {
//       position,
//       style: {
//         toastBackground,
//         color: fontColor
//       }
//     });
//   }
  
  // Custom success toast


  export const customSuccessToast = (message: string) => {
    toast((t) => (
      <div className='bg-[#2E844A]  flex justify-center  items-center pl-1 pr-3 py-2  '  >
        <div className='flex py-1 md:w-72 justify-start px-8 items-center '>
        {!message.includes('Login') && <FaCheckCircle className='text-white text-2xl ' />}

            {!message.includes('Login') ? <p className='text-base  ml-3 text-white' >{message}</p> 
            : <div className='flex ml-2 justify-center items-center'> <Image width={30} src={'https://uxwing.com/wp-content/themes/uxwing/download/emoji-emoticon/smile-icon.png'}/><p className='text-base  ml-3 text-white ' >{message}</p> </div>}
        </div>
       
        <IoClose onClick={() => toast.dismiss(t.id)} className='text-white text-2xl hover:cursor-pointer'/>
      </div>
    ),);
  }
  
  
  // Custom context toast
  export const customContextToast = (content: JSX.Element,  toastBackground: string = 'bg-white', fontColor: string = 'text-black') => {
    toast((t) => (
      <div>
        {content}
        <button onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </button>
      </div>
    ), {
      
      style: {
        toastBackground,
        color: fontColor
      }
    });
  }
  

  
  // Custom error toast
  export const customErrorToast = (message: string) => {
    toast((t) => (
      <div className='bg-[#BA0517]  flex justify-center  items-center pl-1 pr-3 py-2  md:w-72'  >
        <div className='flex py-1  justify-start px-8 items-center  '>
        <SiIfixit className='text-white text-2xl ' />

            <p className=' text-sm md:text-base  ml-3 text-white' >{message}</p>
        </div>
       
        <IoClose onClick={() => toast.dismiss(t.id)} className='text-white text-2xl hover:cursor-pointer'/>
      </div>
    ),);
  }
  