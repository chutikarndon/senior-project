const [showModal, setShowModal] = useState(false);
// onClick={() => setShowModal(true)}
{showModal?(
    <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <Tabs color="pink" />
                    {/*header*/}
                    {/* <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Modal Title
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                    </div> */}
                    {/*body*/}
                    {/* <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            I always felt like I could do anything. That’s the main
                            thing people are controlled by! Thoughts- their perception
                            of themselves! They're slowed down by their perception of
                            themselves. If you're taught you can’t do anything, you
                            won’t do anything. I was taught I could do everything.
                        </p>
                    </div> */}
                    {/*footer*/}
                    {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Save Changes
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>    
): null}


//tab
const Tabs = ({ color }) => {
    const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
        <div className="flex flex-wrap">
            <div className="w-full">
                <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 1
                                ? "text-white bg-" + color + "-600"
                                : "text-" + color + "-600 bg-white")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            Profile
                        </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 2
                                ? "text-white bg-" + color + "-600"
                                : "text-" + color + "-600 bg-white")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            Settings
                        </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 3
                                ? "text-white bg-" + color + "-600"
                                : "text-" + color + "-600 bg-white")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(3);
                            }}
                            data-toggle="tab"
                            href="#link3"
                            role="tablist"
                        >
                            Options
                        </a>
                    </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <p>
                                    Collaboratively administrate empowered markets via
                                    plug-and-play networks. Dynamically procrastinate B2C users
                                    after installed base benefits.
                                    <br />
                                    <br /> Dramatically visualize customer directed convergence
                                    without revolutionary ROI.
                                </p>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <p>
                                    Completely synergize resource taxing relationships via
                                    premier niche markets. Professionally cultivate one-to-one
                                    customer service with robust ideas.
                                    <br />
                                    <br />
                                    Dynamically innovate resource-leveling customer service for
                                    state of the art customer service.
                                </p>
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                <p>
                                    Efficiently unleash cross-media information without
                                    cross-media value. Quickly maximize timely deliverables for
                                    real-time schemas.
                                    <br />
                                    <br /> Dramatically maintain clicks-and-mortar solutions
                                    without functional solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};




<script>

</script>
{/* <script>
const messageBoxButton = document.getElementById('message-box')
const chatCloseButton = document.getElementById('chat-close-button')
chatCloseButton.addEventListener('click', e => {

    const chatPanel = document.getElementById('chat-panel')
    const toolBarWrapper = document.querySelector('.tool-bar-wrapper')
    toolBarWrapper.classList.toggle('hide-tool-bar')
    chatPanel.classList.toggle('display-chat-panel')
})
messageBoxButton.addEventListener('click', e => {
    if (e.target.classList.contains('dot'))
    e.target.classList.remove('dot')
    const chatPanel = document.getElementById('chat-panel')
    const toolBarWrapper = document.querySelector('.tool-bar-wrapper')
    toolBarWrapper.classList.toggle('hide-tool-bar')
    chatPanel.classList.toggle('display-chat-panel')
})
</script>
<script>
const setTime = () => {
    const timeButton = document.getElementById('time')
    var time = new Date();
    timeButton.innerHTML = `${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
}
setTime()
setInterval(() => {
    setTime()
}, 500);
const shareToggleButton = document.getElementById('share-toggle')
shareToggleButton.addEventListener('click', e => {
    const dialogue = document.querySelector('.dialogue-container')
    dialogue.classList.toggle('dialogue-active')
})
const copyButton = document.querySelector('#copy-button')
const shareLink = document.querySelector('.share-link')
shareLink.innerHTML = window.location.href
copyButton.setAttribute('meeting_link', window.location.href)
const dialogueCloseButton = document.querySelector('#close-dialogue')
dialogueCloseButton.addEventListener('click', (e) => {
    const dialogue = document.querySelector('.dialogue-container')
    dialogue.classList.toggle('dialogue-active')
})
copyButton.addEventListener("mousedown", (e) => {
    const copyText = e.target.getAttribute('meeting_link')
    navigator.clipboard.writeText(copyText);
    e.target.setAttribute("tool_tip", 'copied');
});
copyButton.addEventListener("mouseout", (e) => {
    e.target.setAttribute("tool_tip", 'copy');
});
</script>
<script>
const cameraBtn = document.querySelector('#cams-toggle')
cam = {}
function gotDevices(mediaDevices) {
    let count = true;
    mediaDevices.forEach((mediaDevice) => {
    if (mediaDevice.kind === "videoinput") {
        cam[mediaDevice.deviceId] = count;
        count = false;
    }
    });
    cameraBtn.setAttribute('camera', JSON.stringify(cam))
}
navigator.mediaDevices.enumerateDevices().then(gotDevices);
</script> */}




//old menu

const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
{/* <div className=" flex justify-center items-center border-spacing-1 w-5 pt-5">
                                <button onClick={() => setShowModal1(!showModal1)}> 2</button>
                                    {showModal1 && (
                                        <div ref={ref} className="justify-center items-center flex overflow-x-hidden overflow-y-auto w-96 h-64 absolute inset-0 z-50 outline-none focus:outline-none ml-40 bg-orange-500">
                                            <div></div>
                                        </div>
                                    )}
                                </div>
                                <div className=" flex justify-center items-center border-spacing-1 w-5 pt-5">
                                <button onClick={() => setShowModal2(!showModal2)}> 3</button>
                                    {showModal2 && 
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto w-96 h-64 absolute inset-0 z-50 outline-none focus:outline-none ml-40 bg-red-600">
                                            <div></div>
                                        </div>
                                    }
                                </div>
                                <div className=" flex justify-center items-center border-spacing-1 w-5 pt-5">
                                <button onClick={() => setShowModal3(!showModal3)}> 4</button>
                                    {showModal3 && 
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto w-96 h-64 absolute inset-0 z-50 outline-none focus:outline-none ml-40 bg-lime-700">
                                            <div></div>
                                        </div>
                                    }
                                </div> */}


//tabs
    // const [backendData, setBackendData] = useState([{}])
    // useEffect(() => {
    //     fetch("/cart").then(
    //     response => response.json()
    //     ).then(
    //     data => {
    //         setBackendData(data)
    //     }
    //     )
    // }, [])
    // const [ product, setProduct] = useState({
    //     pName: "",
    //     pImg: ""
    // })
    // const handleChange = (event) => {
    //     const {name , value} = event.target;
    //     setProduct((prevState) => {
    //         return {
    //             ...prevState,
    //             [name] : value,
    //         };
    //     });
    // };
    // const onSubmit = e => {
    //     e.preventDefault()

    //     console.log('submit value', product)
    // }

    // const [currentTab, setCurrentTab] = useState('1');
    // const tabs = [
    //     {id: 1, 
    //         tabTitle: '1'
    //         // <img className=" w-6 h-6" src={require("../image/rice.png")} alt="rice"></img>
    //          ,
    //         content: 
    //             <div className=" grid grid-cols-4 gap-3 text-xl">
    //                 <button className=" flex flex-col items-center container bg-red-100 rounded" type="submit" onClick={onSubmit}>
    //                     <form onSubmit={onSubmit}>
    //                         <img className=" w-36 h-36" src={require("../image/grape.png")} name="pImg" value={pImg}></img>
    //                         <p className=" text-center" name="pName" value={pName}>เป็ด</p>
    //                     </form>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">ไก่</p>                   
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">หมูสามชั้น</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">ปลา</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">ผัดหมี่ซั่ว</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">ต้มจืด</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">พะโล้</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">ปลาหมึกแห้ง</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className="w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">ผัดหน่อไม้กุ้ง</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className="w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">ข้าวสวย</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">ชาจีน</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                     <p className=" text-center pb-1">น้ำเปล่า</p>
    //                 </button>
    //             </div> 
    //         },
    //     {id: 2, tabTitle: 2,
    //             //  <img className=" w-6 h-6" src={require("../image/orange (1).png")} alt=" dessert"></img>,
                
    //         content: 
                
    //                 <div className=" grid grid-cols-4 gap-3 text-xl">
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">ขนมสาลี</p> 
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">ขนมไข่</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">ถ้วยฟู</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">จันทร์อับ</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">กัวท้อ</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className="w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">ซาลาเปา</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">ขนมเข่ง</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">ขนมเทียน</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/orange.png")}></img>
    //                         <p className=" text-center pb-1">ส้ม</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className="w-36 h-36" src={require("../image/apple.png")}></img>
    //                         <p className=" text-center pb-1">แอปเปิ้ล</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/grape.png")}></img>
    //                         <p className=" text-center pb-1">องุ่น</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/banana.png")}></img>
    //                         <p className=" text-center pb-1">กล้วยหอม</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/pomelo.png")}></img>
    //                         <p className=" text-center pb-1">ส้มโอ</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/pomelo.png")}></img>
    //                         <p className=" text-center pb-1">แก้วมังกร</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/pomelo.png")}></img>
    //                         <p className=" text-center pb-1">สาลี</p>
    //                     </button>
    //                     <button className=" flex flex-col items-center container bg-white rounded">
    //                         <img className=" w-36 h-36" src={require("../image/pomelo.png")}></img>
    //                         <p className=" text-center pb-1">สัปปะรด</p>
    //                     </button>
    //                 </div>  
                
    //     },
    //     {id: 3, tabTitle: 3 , 
    //         //     <img className=" w-6 h-6" src={require("../image/firecracker (1).png")} alt="firecracker"></img>,
    //         content: 
    //             <div className=" grid grid-cols-4 gap-3 text-xl">
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/banana.png")}></img>
    //                     <p className=" text-center pb-1">เสื้อผ้า</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className="w-36 h-36" src={require("../image/banana.png")}></img>
    //                     <p className=" text-center pb-1">ใบเบิกทาง</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/banana.png")}></img>
    //                     <p className=" text-center pb-1">เงินทอง</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/banana.png")}></img>
    //                     <p className=" text-center pb-1">ของเครื่องใช้</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/banana.png")}></img>
    //                     <p className=" text-center pb-1">กิมจั้ว</p>
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/banana.png")}></img>
    //                     <p className=" text-center pb-1">ธนบัตรยมโลก</p>    
    //                 </button>
    //                 <button className=" flex flex-col items-center container bg-white rounded">
    //                     <img className=" w-36 h-36" src={require("../image/banana.png")}></img>
    //                     <p className=" text-center pb-1">ตั่วกิม</p>
    //                 </button>
    //             </div>
    //     },
    //     {id: 4, 
    //         tabTitle: 4,
    //             // <img className=" w-6 h-6" src={require("../image/shoppingCart.png")} alt="shopping cart"></img>,
    //         content: 
    //             <div>
    //                 <div className=" grid grid-cols-4 gap-3 text-xs">    
    //                     {typeof backendData.data === "undefined" ? (   
    //                         <p>Loading...</p>
    //                         ) : ( 
    //                         backendData.data.map((data,i) => 
    //                             <button key ={i} className =" flex flex-col items-center container bg-white rounded">
    //                                 <img className=" w-36 h-36" key={i} src={data.image} alt=""/>
    //                                 {/* <p className=" w-36 h-36" key={i}>{data.image}</p> */}
    //                                 <p className=" text-center text-xl pb-1" key={i}>{data.productname}</p>
    //                             </button>)        
    //                     )} 
    //                 </div>
    //             </div>    
    //     }
    // ];
    // const handleTabClick = (e) => {
    //     setCurrentTab(e.target.id);
    // }


{/* <div className=" container w-12 bg-amber-300 shadow-md overflow-hidden border-spacing-1 rounded-t-lg"> 
                    <div >
                        <button class=" rounded-full w-12 h-14 flex justify-center items-center hover:cursor-pointer" onClick={() => setIsActive(!isActive)}><img className=" w-9 h-9" src={require("../image/home.png")} alt="home"></img></button>
                    </div> 
                    {isActive && 
                        <div className=" h-20 visible transition absolute">
                            <div className="container w-12 h-64 bg-amber-300 shadow-md overflow-hidden border-spacing-1 rounded-b-lg">
                                <div className=" flex justify-center items-center border-spacing-12 w-12 pt-5 ">
                                    <div className=" flex flex-col justify-between items-center space-y-7">
                                        {tabs.map((tab,i) => 
                                            <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)} className=" w-12 h-8 hover:bg-amber-500">{tab.tabTitle}</button>
                                        )}
                                    </div>
                                    <div className="flex snap-y w-138 h-128 absolute inset-0 z-50 mx-96 my-1 bg-red-400 p-3 rounded">
                                        {tabs.map((tab, i) =>
                                            <div key={i} id={tab.id} className=" overflow-y-auto">
                                               {currentTab === `${tab.id}` && <div>{tab.content}</div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>                */}



              <button class=" w-14 h-9" onClick={() => setIsActive(!isActive)}>
                <img
                  className=" w-6 h-6"
                  src={require("../image/fire.png")}
                  alt="fire"
                ></img>
              </button>
              {isActive && (
                <div className="justify-center flex overflow-x-hidden overflow-y-auto absolute inset-0 right-5 left-5 top-5 bottom-28 bg-red-50 border-2 border-red-700">
                  <div className=" flex flex-col items-center">
                    <div className="flex flex-row">
                        <div className=" absolute inset-0 left-2 top-2 hover:cursor-pointer w-10 h-10" onClick={()=>setIsActive(!isActive)}><img className=" w-10 h-10" src={require("../image/close.png")}/></div>
                        <div>fire</div> 
                    </div>    
                      <div className="  pb-3 w-138 h-36 bg-amber-100 border-2 border-amber-700 absolute bottom-5 overflow-x-auto overflow-y-hidden">
                        <div className=" p-2 flex flex-row gap-3">  {/*เครื่องกระดาษ*/}  
                        {typeof backendData.data === "undefined" ? (   
                            <p>Loading...</p>
                        ) : (  
                            backendData.data.map((data,i) => 
                                <div key ={i}>
                                    <DragMove onDragMove={handleDragMove}>
                                        <div  style={{transform: `translateX(${translate.x}px) translateY(${translate.y}px)`}}>
                                            <img className="w-32 h-32 " key={i} src={data.image} alt=""/>
                                        </div>
                                    </DragMove>
                                </div>)        
                            )} 
                    </div>   
                  </div>   
              </div>
            </div>
          )}
          <button class=" w-14 h-9" onClick={() => setSetting(!setting)}>
            <img
              className=" w-6 h-6 hover:border"
              src={require("../image/settings.png")}
              alt="settings"
            ></img>
          </button>
          {setting && (
            <div className="w-40 h-44 bg-slate-500 absolute bottom-28 rounded-sm "></div>
          )} 