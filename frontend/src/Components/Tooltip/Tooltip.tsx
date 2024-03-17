import { MdSunny } from "react-icons/md"
import { useAppDispatch } from "../../hooks/redux"
import { themeToggle } from "../../Redux/authSlice"

export const ToolTip = ()=>{

    

    return (
        <div className='absolute top-5 right-10 md:top-10 md:right-5   text-dark dark:text-white '>
        <div className='relative'>
        <MdSunny className=' text-4xl md:text-5xl hover:cursor-pointer has-tooltip border-0' data-tooltip-target="tooltip-default"  >Change Theme</MdSunny>
        <div id="tooltip-default" role="tooltip" className=" tooltip absolute z-10  inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0  dark:bg-white dark:text-gray-900">
          Change theme
          <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
        </div>
        
        </div>
        
      
    )
}