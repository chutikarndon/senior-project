import { Tab } from "@material-ui/core";
import React, { useState,useEffect } from "react";

const Tabs = () => {
    const [isActive, setIsActive] = useState(false);
    const [openTab, setOpenTab] = React.useState(1);
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

    const [product, setProduct] = useState({
        pName: "",
        imgName: ""
    });
    const handleChange = (event) => {
        const {name, value} = event.target;
        setProduct((prevState) => {
            return{
                ...prevState,
                [name]: value,
            };
        });
    };
    const onSubmit = e => {
        e.preventDefault()
    
        console.log('submit value', product)
    }
    const {pName, imgName} = product;
    return (
        <>
            <div className=" container w-12 bg-amber-300 shadow-md overflow-hidden border-spacing-1 rounded-t-lg">
                <div>
                    <button className=" rounded-full w-12 h-14 flex justify-center items-center hover:cursor-pointer" onClick={() => setIsActive(!isActive)}><img className=" w-9 h-9" src={require("../image/home.png")} alt=""></img></button>
                </div>
                {isActive &&
                    <div className=" h-20 visible transition absolute">
                        <div className="container w-12 h-80 bg-amber-300 shadow-md overflow-hidden border-spacing-1 rounded-b-lg">
                            <div className=" flex justify-center items-center border-spacing-12 w-12 pt-5 ">
                                <div className=" flex flex-col justify-between items-center space-y-7" role="tablist">
                                    <button
                                        className={
                                        "w-12 h-10 rounded block leading-normal " +
                                        (openTab === 1
                                            ? "bg-amber-200"  
                                            : " bg-amber-300")
                                        }
                                        onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                    >
                                        <img className=" w-10 h-10" src={require("../image/rice.png")} alt="rice"/>
                                    </button>
                                    <button
                                        className={
                                        "w-12 h-10 rounded block leading-normal " +
                                        (openTab === 2
                                            ? "bg-amber-200"  
                                            : " bg-amber-300")
                                        }
                                        onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                    >
                                        <img className=" w-10 h-10" src={require("../image/orange (1).png")} alt=" dessert"/>
                                    </button>
                                    <button
                                        className={
                                        "w-12 h-10 rounded block leading-normal " +
                                        (openTab === 3
                                            ? "bg-amber-200"
                                            : " bg-amber-300")
                                        }
                                        onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(3);
                                        }}
                                        data-toggle="tab"
                                        href="#link3"
                                        role="tablist"
                                    >
                                        <img className=" w-10 h-10" src={require("../image/firecracker (1).png")} alt="firecracker"/>
                                    </button>
                                    <button
                                        className={
                                        "w-12 h-10 rounded block leading-normal " +
                                        (openTab === 4
                                            ? "bg-amber-200"
                                            : " bg-amber-300")
                                        }
                                        onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(4);
                                        }}
                                        data-toggle="tab"
                                        href="#link4"
                                        role="tablist"
                                    >
                                        <img className=" w-10 h-10" src={require("../image/shoppingCart.png")} alt="shopping cart"/>
                                    </button>
                                </div>
                                <div className="flex snap-y w-138 h-128 absolute inset-0 z-50 mx-96 my-1 bg-red-400 p-3 rounded">
                                    <div className=" overflow-y-auto">
                                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                            <div className=" grid grid-cols-4 gap-3 text-xl">
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl " onClick={onSubmit}>
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt="" name="imgName"/>
                                                    <p className=" text-center" name="pName" value={pName} onChange={handleChange}>เป็ด</p>  
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" onClick={onSubmit}>
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt="" name="imgName" value={imgName} onChange={handleChange}/>
                                                    <p className=" text-center pb-1" value={pName} onChange={handleChange}>ไก่</p>                   
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">หมูสามชั้น</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">ปลา</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">ผัดหมี่ซั่ว</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">ต้มจืด</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/> 
                                                    <p className=" text-center pb-1">พะโล้</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">ปลาหมึกแห้ง</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className="w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">ผัดหน่อไม้กุ้ง</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className="w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">ข้าวสวย</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">ชาจีน</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">น้ำเปล่า</p>
                                                </button>
                                            </div> 
                                        </div>
                                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                            <div className=" grid grid-cols-4 gap-3 text-xl">
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">ขนมสาลี</p> 
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">ขนมไข่</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">ถ้วยฟู</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">จันทร์อับ</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">กัวท้อ</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className="w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">ซาลาเปา</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">ขนมเข่ง</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">ขนมเทียน</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                    <p className=" text-center pb-1">ส้ม</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className="w-36 h-36" src={require("../image/apple.png")} alt=""/>
                                                    <p className=" text-center pb-1">แอปเปิ้ล</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                    <p className=" text-center pb-1">องุ่น</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/banana.png")} alt=""/>
                                                    <p className=" text-center pb-1">กล้วยหอม</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/pomelo.png")} alt=""/>
                                                    <p className=" text-center pb-1">ส้มโอ</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/dragonfruit.png")} alt=""/>
                                                    <p className=" text-center pb-1">แก้วมังกร</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/chinese pear.png")} alt=""/>
                                                    <p className=" text-center pb-1">สาลี</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/pineapple.png")} alt=""/>
                                                    <p className=" text-center pb-1">สัปปะรด</p>
                                                </button>
                                            </div>  
                                        </div>
                                        <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                            <div className=" grid grid-cols-4 gap-3 text-xl">
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/banana.png")} alt=""/>
                                                    <p className=" text-center pb-1">เสื้อผ้า</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className="w-36 h-36" src={require("../image/banana.png")} alt=""/>
                                                    <p className=" text-center pb-1">ใบเบิกทาง</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/banana.png")} alt=""/>
                                                    <p className=" text-center pb-1">เงินทอง</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/banana.png")} alt=""/>
                                                    <p className=" text-center pb-1">ของเครื่องใช้</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/banana.png")} alt=""/>
                                                    <p className=" text-center pb-1">กิมจั้ว</p>
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/banana.png")} alt=""/>
                                                    <p className=" text-center pb-1">ธนบัตรยมโลก</p>    
                                                </button>
                                                <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                    <img className=" w-36 h-36" src={require("../image/banana.png")} alt=""/>
                                                    <p className=" text-center pb-1">ตั่วกิม</p>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={openTab === 4 ? "block" : "hidden"} id="link4">   {/* create delete button */}
                                            <div className=" grid grid-cols-4 gap-3 text-xs">    
                                                {typeof backendData.data === "undefined" ? (   
                                                    <p>Loading...</p>
                                                    ) : (  
                                                    backendData.data.map((data,i) => 
                                                        <button key ={i} className =" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl">
                                                            <img className=" w-36 h-36" key={i} src={data.image} alt=""/>
                                                            <p className=" text-center text-xl pb-1" key={i}>{data.productname}</p>
                                                        </button>)        
                                                )} 
                                            </div>
                                            <div className="mt-12 buttom-0 right-0">
                                                <button className=" w-10 h-10 rounded-md bg-orange-200 hover:border-2 border-orange-50"><img src={require("../image/delete.png")}/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
  );
};

export default Tabs;
  

