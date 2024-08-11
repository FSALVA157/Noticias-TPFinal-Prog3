import { useEffect } from "react";
import spinnerSvg from "../../assets/spinner_1.svg"



export const Spinner = () => {
  
    useEffect(() => {
        setTimeout(() => {
            
        }, 3000);
      
    }, [])
    
  

  return (<>        
                <img src={spinnerSvg}></img>        
      </>);
};