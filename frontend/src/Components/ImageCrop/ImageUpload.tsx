
import { SyntheticEvent, useRef, useState } from "react";
import ReactCrop,{ makeAspectCrop, type Crop, centerCrop, convertToPixelCrop }  from "react-image-crop";
import { setCanvasPreview } from "./setCanvasPreview";
import { Button } from "@nextui-org/react";


const ASPECT_RATIO = 1;
const MIN_WIDTH = 150;

interface ImageUploadProps {
    handleProfilePictureUpdated : (value:string)=> void
   
}
export const ImageUpload:React.FC<ImageUploadProps> = ({handleProfilePictureUpdated})=>{

    //state to store image string
    const [imgSrc,setImgSrc]  = useState<string>('')
    //set crop to a state 
    const [crop,setCrop] = useState<Crop>() 
    const canvasPreviewref = useRef<HTMLCanvasElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const handleChange  = (event:React.ChangeEvent<HTMLInputElement>)=>{
        // take the file
            const file = event.target.files?.[0]
            if (!file){
                return ;
            }
            //create a reader instance and read the image
            const reader = new FileReader()
            reader.addEventListener('load',()=>{
                const imageURL = reader.result?.toString() || '';
                setImgSrc(imageURL)
                
            })
            reader.readAsDataURL(file)
    }

    const handleCropChange = ()=>{

    }
                //onLoad event is said as a SyntheticEvent
    const handleImageOnLoad =(event:SyntheticEvent<HTMLImageElement>)=>{

            const {width,height,naturalWidth,naturalHeight} = event.currentTarget;  //get current width and height of element
            //if original width height of image > 150 reject it.
            if (naturalHeight < 150 || naturalWidth <  150){
                //custom error
                return;
            }
            const cropWidth = (MIN_WIDTH/width)* 100;
            //makeAspectCrop crop element to top left 
            const crop = makeAspectCrop({    
                                            unit:'%',     //px or '%'
                                            width:cropWidth         //MIN_WIDTH
                                        },
                                        ASPECT_RATIO,
                                        width,
                                        height)

            //to make crop element center 
            const centeredCrop = centerCrop(crop,width,height)

            setCrop(centeredCrop)
                                            // to move the crop we want to implement the onChange in crop
            }

    return (
        <>
        <div className=" w-11/12 p-3 h-11/12 mb-2">
        <input type='file' 
        accept='image/jpeg , image/jpg ,image/png' name='image' 
        className='border-3 border-green-700'
        onChange={handleChange}
            />
        { imgSrc && 
        <div className="mt-3 p-2" >
            <ReactCrop 
            crop={crop}
            minWidth={MIN_WIDTH}
            aspect={ASPECT_RATIO}
            keepSelection
            circularCrop
            onChange={(pixelCrop,percentageCrop)=>setCrop(percentageCrop)}
                >
                    <img src={imgSrc}
                    onLoad={handleImageOnLoad}
                    ref={imgRef}/>
                    
                    
   
               
                </ReactCrop>
                <div className="flex justify-center mt-3">
                    <Button 
                    className="text-white bg-gray-800 rounded-xl  px-4  hover:bg-white hover:text-gray-900 " 
                     onClick={()=>{
                        if (imgRef.current && canvasPreviewref.current && crop){
                        setCanvasPreview(
                        imgRef.current,
                        canvasPreviewref.current,
                        convertToPixelCrop(crop,imgRef.current?.width,imgRef.current?.height)
                        )}
                    const croppedImageURl = canvasPreviewref.current?.toDataURL()
                    if (croppedImageURl){
                        handleProfilePictureUpdated(croppedImageURl)
                     
                    }
                    }
                    }
                     >Crop</Button>
                    </div>
                <div className="hidden">
                {crop && 
                <canvas className="mt-4 w-[150] h-[150] hidden" ref={canvasPreviewref}>

                </canvas>
                }</div>
        </div>
        }
        </div>

        </>
    )
}