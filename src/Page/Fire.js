import React, {useState, useEffect} from "react";
import DragMove from "../DragMove";

const Fire = () =>{
    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
    });
    
    const handleDragMove = (e) => {
        setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY
        });
    };
    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
        fetch("/cart").then(
        response => response.json()
        ).then(
        data => {
            setBackendData(data)
        }
        )
    }, [])
    return(
        <div className=" flex flex-col items-center">
            <div>fire</div>
            <div className=" mt-72 pb-3 w-138 h-36 bg-amber-100 border-2 border-amber-200">
                <div className=" p-2 flex flex-row gap-3">  {/*เครื่องกระดาษ*/}  
                    {typeof backendData.data === "undefined" ? (   
                        <p>Loading...</p>
                    ) : (  
                        backendData.data.map((data,i) => 
                            <div key ={i}>
                                <DragMove onDragMove={handleDragMove}>
                                    <div  style={{transform: `translateX(${translate.x}px) translateY(${translate.y}px)`}}>
                                        <img className="w-32 h-32" key={i} src={data.image} alt=""/>
                                    </div>
                                </DragMove>
                            </div>)        
                        )} 
                </div>   
            </div>   
        </div>
    )
}
export default Fire;