import React, { useState, useEffect, useRef } from "react";
import DragMove from "../DragMove";
// import Tabs from "../Page/Tabs";
// import Fire from "../Page/Fire";
import "../incenseBurner.css";
// import { InfoBox } from "../infoBox";
// import { Animate } from "react-simple-animate";
// import logo from "../logo.svg";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "5px",
    width: "3px",
  },
}));

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 13%;
  width: 13%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const RoomMeet = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [setting, setSetting] = useState(false);
  const [member, setMember] = useState(false);
  const [isVoice, setVoice] = useState(false);
  const [isVideo, setVideo] = useState(false);
  const [chat, setChat] = useState(false);
  const [openMenu, setOpenMenu] = useState(false); {/* open menu user and chat */}
  const [backendData, setBackendData] = useState([{}]);
  const location = useLocation();
  const roomID = location.state.roomId;
  const userID = location.state.username;

  function fetchData() {
    fetch(`/cart/${roomID}`)
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }

  const [productsData, setProductsData] = useState([{}]);
  useEffect(() => {
    fetch("/getProducts")
      .then((response) => response.json())
      .then((data) => {
        setProductsData(data);
      });
  }, []);

  /* incense burner */
  const [isBurning, setIsBurning] = useState(false);

  const classes = useStyles();
  // const state = {play: false};

  

  // const localVideoRef = useRef(null);
  // const [mediaStream, setMediaStream] = useState();
  // const remoteVideoRefs = useRef([]);
  // const [remoteStreams, setRemoteStreams] = useState([]);
  // const location = useLocation();
  // const [username, setUsername] = useState();
  // const roomId = location.state.roomId;
  // const [activeUsers, setActiveUsers] = useState([]);
  // const [socket, setSocket] = useState(null);

  // const [peers, setPeers] = useState([]);
  // const userVideo = useRef();
  // const peersRef = useRef([]);
  // // useEffect(() => {
  // //   const getDeviceMedia = async () => {
  // //     const stream = await navigator.mediaDevices.getUserMedia({
  // //       video: true,
  // //       audio: true,
  // //     });
  // //     setMediaStream(stream);
  // //     if (localVideoRef.current) {
  // //       localVideoRef.current.srcObject = stream;
  // //     }
  // //   };
  // //   getDeviceMedia();
  // // }, []);

  // useEffect(() => {
  //   const socket = io("http://localhost:3000");
  //   setSocket(socket);
  //   socket.on("connection", () => console.log("connected"));
  //   socket.emit("joinroom", location.state.roomId, location.state.username);
  //   socket.on("all-users", (users) => {
  //     console.log("Active Users");
  //     console.log(users);
  //     setActiveUsers(users);
  //   });

  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: true,
  //       audio: true,
  //     })
  //     .then((stream) => {
  //       setMediaStream(stream);
  //       if (localVideoRef.current) {
  //         localVideoRef.current.srcObject = stream;
  //       }

  //     });

  //   socket.emit("add-stream", localVideoRef);

  //   // if (activeUsers.length > 1) {
  //   //   socket.on("new-remote-stream", (stream) => {
  //   //     setRemoteStreams([...remoteStreams, stream]);
  //   //   });
  //   // }

  //   return () => socket.disconnect();
  // }, []);

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3000");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
    return () => {
      socketRef.disconnect();
    };
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  /*tab menu */
  const [isMenu, setMenu] = useState(false);
  const [openTab, setOpenTab] = React.useState(1);
  const handleClick = (e) => {
    const id = e.currentTarget.id;
    socketRef.current.emit("collect", { id, roomID });
  };

  const [pid, setPid] = useState(0);

  /*delete button */
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);
  const toggleDeleteMenu = () => {
    setIsDeleteMenuOpen(!isDeleteMenuOpen);
  };
  const handleDelete = () => {
    socketRef.current.emit("delete", { pid, roomID });
    fetchData();
    setIsDeleteMenuOpen(false);
  };

  const toggleCamera = () => {
    setVideo((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isVideo) {
      // Turn off the camera by setting the srcObject of the video element to null
      userVideo.current.srcObject = null;
    } else {
    }
  }, [isVideo]);

  /*drag move fire page */
  // const [translate, setTranslate] = useState({
  //   x: 0,
  //   y: 0,
  // });
  // const handleDragMove = (e) => {
  //   setTranslate({
  //     x: translate.x + e.movementX,
  //     y: translate.y + e.movementY,
  //   });
  // };
  const [itemId, setItemId] = useState();
  

  const dragStarted=(id)=>{
    setItemId(id);
    console.log(" Drag has started", itemId)
  }
  const draggingOver=(e)=>{
    e.preventDefault();
    console.log("Dragging Over now", itemId)
  }
  const dragDropped=()=>{
    socketRef.current.emit("delete",{itemId, roomID});
    fetchData();
    console.log("droped" ,itemId)
  }

  {/* toggle */}  
  const [enabled, setEnabled] = useState(false)

  {/*expand video */}
  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <div className=" backgroundRoommeet bg-repeat bg-cover">
      <div className=" flex flex-col justify-items-center h-screen">
        <div className="flex flex-row justify-between items-start mt-10 ml-12 mr-4 h-5/6 ">
          {" "}
          {/* Header*/}
          <div>
            {/*tab menu */}
            <div>     
              <button className=" absolute top-[10%] left-[3%] w-[80px] h-[80px] hover:scale-105" onClick={() => setMenu(!isMenu)}>
                <div className="absolute rounded-sm w-[45px] h-[45px] rotate-45 z-0 top-[15%] left-[15%] bgM "></div>
                <img className=" absolute z-20 left-[5%] top-0 w-[55px] h-[55px]" src={require("../image/shoppingCart.png")} alt=""></img>
                <div className=" buttonG absolute z-10 bottom-0 w-[70px] h-[23px] rounded-md">
                  <p className=" text-[18px] text-[#F4C43E]">
                    ตะกร้า
                  </p>
                </div>
              </button>
                {isMenu &&
                  <div className=" absolute top-[23%] left-[2.5%] w-[80px] h-[320px]">
                    <div className=" flex justify-center items-center ">
                      <div className=" flex flex-col items-center space-y-[20px.0] " role="tablist">
                        <button className={"absolute  w-[80px] h-[80px] flex justify-center " +(openTab === 1 ? "scale-125": "")}
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                            }}                                          
                          data-toggle="tab"
                          href="#link1"
                          role="tablist"
                        >                
                          <div className="absolute rounded-sm w-[45px] h-[45px] rotate-45 z-0 top-[19%] left-[19%] bgM "></div>
                          <img className=" absolute z-20 left-[13%] top-0 w-[55px] h-[55px]" src={require("../image/buns.png")} alt=""></img>
                          <div className=" buttonG absolute z-10 bottom-0 w-[70px] h-[23px] rounded-md">
                            <p className=" text-[18px] text-[#F4C43E]">
                              ของคาว
                            </p>
                          </div>               
                        </button>                  
                        <button className={ " absolute w-[80px] h-[80px] top-[30%] flex justify-center " + (openTab === 2 ? "scale-125": "") }         
                          onClick={e => {            
                            e.preventDefault();          
                            setOpenTab(2);              
                          }}                
                          data-toggle="tab"                
                          href="#link2"                    
                          role="tablist"                
                        >                  
                          <div className="absolute rounded-sm w-[45px] h-[45px] rotate-45 z-0 top-[25%] left-[25%] bgM "></div>
                          <img className=" absolute z-20 left-[15%] top-0 w-[55px] h-[55px]" src={require("../image/vegetable.png")} alt=""></img>
                          <div className=" buttonG absolute z-10 bottom-0 w-[70px] h-[23px] rounded-md">
                            <p className=" text-[18px] text-[#F4C43E]">
                              ผลไม้
                            </p>
                          </div>                 
                        </button>                         
                        <button className={ " absolute w-[80px] h-[80px] top-[60%] flex justify-center " + (openTab === 3 ? "scale-125": "")}          
                          onClick={e => {                
                          e.preventDefault();                
                          setOpenTab(3);                
                          }}                    
                          data-toggle="tab"                
                          href="#link3"
                          role="tablist"                
                        >                  
                          <div className="absolute rounded-sm w-[45px] h-[45px] rotate-45 z-0 top-[20%] left-[25%] bgM "></div>
                          <img className=" absolute z-20 left-[19%] top-0 w-[55px] h-[55px]" src={require("../image/gold.png")} alt=""></img>
                          <div className=" buttonG absolute z-10 bottom-0 w-[70px] h-[23px] rounded-md">
                            <p className=" text-[18px] text-[#F4C43E]">
                              กระดาษ
                            </p>
                          </div> 
                        </button>                       
                        <button className={" absolute w-[80px] h-[80px] top-[90%] flex justify-center "+(openTab === 4 ? " scale-125": "")}
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(4);
                            fetchData()
                          }}                
                            data-toggle="tab"
                            href="#link4"
                            role="tablist"
                        >
                          <div className="absolute rounded-sm w-[45px] h-[45px] rotate-45 z-0 top-[20%] left-[25%] bgM "></div>
                          <img className=" absolute z-20 left-[18%] top-0 w-[55px] h-[55px]" src={require("../image/candle.png")} alt=""></img>
                          <div className=" buttonG absolute z-10 bottom-0 w-[70px] h-[23px] rounded-md">
                            <p className=" text-[18px] text-[#F4C43E]">
                              โต๊ะไหว้
                            </p>
                          </div> 
                        </button>
                        </div>
                          <div className="flex snap-y w-[690px] h-[485px] absolute left-[425%] top-[7%] z-20 bg-[#EABA66] p-3 rounded">
                            <div className=" overflow-y-hidden scroll-smooth hover:overflow-y-auto overflow-x-hidden ">
                              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <div className=" grid grid-cols-5 gap-3 text-xl">              
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl " handleClick={handleClick} id={"0"}>
                                    <img className=" w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center" >เป็ด</p>  
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"1"}>
                                    <img className=" w-[120px] h-[120px]" src={require("../image/grape.png")} alt="" />
                                    <p className=" text-center pb-1" >ไก่</p>                   
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] p-2 rounded hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"2"}>                
                                    <img className=" w-[120px] h-[120px]" src={require("../image/หมู.png")} alt=""/>                  
                                    <p className=" text-center pb-1">หมูสามชั้น</p>                  
                                  </button>                
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"3"}>
                                    <img className=" w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center pb-1">ปลา</p>
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"0"}>
                                    <img className=" w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center pb-1">ผัดหมี่ซั่ว</p>
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"4"}>
                                    <img className="w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center pb-1">ต้มจืด</p>
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"5"}>
                                    <img className=" w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/> 
                                    <p className=" text-center pb-1">พะโล้</p>
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"6"}>
                                    <img className=" w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center pb-1">ปลาหมึกแห้ง</p>
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"7"}>
                                    <img className="w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center pb-1">ผัดหน่อไม้กุ้ง</p>
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"8"}>
                                    <img className="w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center pb-1">ข้าวสวย</p>
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"9"}>
                                    <img className="w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center pb-1">ชาจีน</p>
                                  </button>
                                  <button className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"10"}>
                                    <img className=" w-[120px] h-[120px]" src={require("../image/grape.png")} alt=""/>
                                    <p className=" text-center pb-1">น้ำเปล่า</p>
                                  </button>
                                </div> 
                              </div>
                              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <div className=" grid grid-cols-5 gap-3 text-[20px]">
                                                  {/*<button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"11"}>
                                                      <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                      <p className=" text-center pb-1">ขนมสาลี</p> 
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"12"}>
                                                      <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                      <p className=" text-center pb-1">ขนมไข่</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"13"}>
                                                      <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                      <p className=" text-center pb-1">ถ้วยฟู</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"14"}>
                                                      <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                      <p className=" text-center pb-1">จันทร์อับ</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"15"}>
                                                      <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                      <p className=" text-center pb-1">กัวท้อ</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"16"}>
                                                      <img className="w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                      <p className=" text-center pb-1">ซาลาเปา</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"17"}>
                                                      <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                      <p className=" text-center pb-1">ขนมเข่ง</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"18"}>
                                                      <img className=" w-36 h-36" src={require("../image/orange.png")} alt=""/>
                                                      <p className=" text-center pb-1">ขนมเทียน</p>
                                                  </button> */}
                                  {typeof productsData.fruits === "undefined" ? (
                                    <p>Loading...</p>
                                  ) : (
                                    productsData.fruits.map((data, i) => (
                                      <button
                                        key={i}
                                        className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl active:bg-red-100"
                                        onClick={handleClick}
                                        id={data.id}
                                      >
                                        <img
                                          className=" w-[120px] h-[120px]"
                                          key={i}
                                          src={data.imageUrl}
                                          alt=""
                                        />
                                        <p
                                          className=" text-center text-xl pb-1"
                                          key={i}
                                        >
                                          {data.name}
                                        </p>
                                      </button>
                                    ))
                                  )}
                                </div>
                              </div>
                              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                <div className=" grid grid-cols-5 gap-3 text-xl">
                                  <button
                                    className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    handleClick={handleClick}
                                    id={"27"}
                                  >
                                    <img
                                      className=" w-[120px] h-[120px]"
                                      src={require("../image/banana.png")}
                                      alt=""
                                    />
                                    <p className=" text-center pb-1">เสื้อผ้า</p>
                                  </button>
                                  <button
                                    className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    handleClick={handleClick}
                                    id={"28"}
                                  >
                                    <img
                                      className="w-[120px] h-[120px]"
                                      src={require("../image/banana.png")}
                                      alt=""
                                    />
                                    <p className=" text-center pb-1">ใบเบิกทาง</p>
                                  </button>
                                  <button
                                    className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    handleClick={handleClick}
                                    id={"29"}
                                  >
                                    <img
                                      className=" w-[120px] h-[120px]"
                                      src={require("../image/banana.png")}
                                      alt=""
                                    />
                                    <p className=" text-center pb-1">เงินทอง</p>
                                  </button>
                                  <button
                                    className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    handleClick={handleClick}
                                    id={"30"}
                                  >
                                    <img
                                      className="w-[120px] h-[120px]"
                                      src={require("../image/banana.png")}
                                      alt=""
                                    />
                                    <p className=" text-center pb-1">
                                      ของเครื่องใช้
                                    </p>
                                  </button>
                                  <button
                                    className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    handleClick={handleClick}
                                    id={"31"}
                                  >
                                    <img
                                      className="w-[120px] h-[120px]"
                                      src={require("../image/banana.png")}
                                      alt=""
                                    />
                                    <p className=" text-center pb-1">กิมจั้ว</p>
                                  </button>
                                  <button
                                    className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    handleClick={handleClick}
                                    id={"32"}
                                  >
                                    <img
                                      className=" w-[120px] h-[120px]"
                                      src={require("../image/banana.png")}
                                      alt=""
                                    />
                                    <p className=" text-center pb-1">ธนบัตรยมโลก</p>
                                  </button>
                                  <button
                                    className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    handleClick={handleClick}
                                    id={"33"}
                                  >
                                    <img
                                      className=" w-[120px] h-[120px]"
                                      src={require("../image/banana.png")}
                                      alt=""
                                    />
                                    <p className=" text-center pb-1">ตั่วกิม</p>
                                  </button>
                                </div>
                              </div>
                              <div
                                className={openTab === 4 ? "block" : "hidden"}
                                id="link4"
                                class=" relative"
                              >
                                {" "}
                                {/* create delete button */}
                                <div className=" grid grid-cols-5 gap-3 text-xs">
                                  {typeof backendData.roomCart === "undefined" ? (
                                    <p>Loading...</p>
                                  ) : (
                                    backendData.roomCart.map((data, i) => (
                                      <button
                                        key={i}
                                        className=" flex flex-col items-center container bg-[#E9A327] border-[1px] border-[#AF010A] rounded transition ease-in-out hover:bg-red-100 shadow-xl "
                                        onClick={() => {
                                          setIsDeleteMenuOpen(true);
                                          setPid(data.id);
                                        }}
                                        id={data.id}
                                      >
                                        <img
                                          className=" w-[120px] h-[120px]"
                                          key={i}
                                          src={data.imageUrl}
                                          alt=""
                                        />
                                        <p
                                          className=" text-center text-xl pb-1"
                                          key={i}
                                        >
                                          {data.name}
                                        </p>
                                      </button>
                                    ))
                                  )}
                                </div>
                            {isDeleteMenuOpen && (
                              <div className="flex flex-col items-center w-56 h-24 bg-[#F4C43E] border-[1px] border-[#C96320] absolute inset-0 top-52 left-52 p-2 rounded-md">
                                <p className="text-center">
                                  คุณต้องการลบของไหว้หรือไม่
                                </p>
                                <div className=" flex flex-row absolute top-[50%]">
                                  <button
                                    className=" mt-1 w-7 h-7 rounded-md bg-[#E9A327] border-[1px] border-[#AF010A] shadow-md hover:scale-110"
                                    onClick={() => handleDelete()}
                                  >
                                    <img src={require("../image/delete.png")} />
                                  </button>
                                  <button
                                    className=" mt-1 ml-[20px] w-7 h-7 rounded-md bg-[#E9A327] border-[1px] border-[#AF010A] shadow-md hover:scale-110"
                                    onClick={toggleDeleteMenu}
                                  >
                                    <img src={require("../image/close.png")} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className=" overflow-x-auto  ">
            {" "}
            {/* other user*/}
            {/* <div className=" flex flex-row w-96">
              <div className="w-44 h-32" muted ref={userVideo} autoPlay playsInline />
              
            </div> */}
            <div className=" flex flex-row gap-3 p-2">
              <StyledVideo muted ref={userVideo} autoPlay playsInline />
              {peers.map((peer, index) => {
                return <Video key={index} peer={peer} />;
              })}
            </div>
          </div>
          <div>
            <button onClick={() => {setEnabled(!enabled
              );}} className="absolute h-[80px] w-[80px] right-[5%] top-[10%] hover:scale-105">
              <div className="absolute rounded-sm w-[45px] h-[45px] rotate-45 z-0 top-[15%] left-[15%] bgM "></div>
              <img className=" absolute z-20 left-[13%] top-0 w-[50px] h-[50px]" src={require("../image/camera.png")} alt=""></img>
              <div className=" buttonG absolute z-10 bottom-0 w-[70px] h-[23px] rounded-md">
                <p className=" text-[18px] text-[#F4C43E] text-center">
                  แชร์โต๊ะ
                </p>
              </div>
            </button>
          </div>
          {enabled && (
            <div className=" z-10 bg-white w-[650px] h-[433px] absolute top-[30%] left-[28%]">
              <button className=" absolute right-[3%] top-[5%] w-[45px] h-[45px]" onClick={() =>setEnabled(false) }><img className=" w-[45px] h-[45px]" src={require("../image/close.png")}/></button>
              share video
            </div>
          )}
          
        </div>
        <div className=" flex justify-center">
          {" "}
          {/* middle*/}
          <div className=" flex justify-center w-2/5  h-full rounded-full">
            <div className=" flex flex-col justify-center items-center absolute z-0 bg-[#F4C43E] w-[645px] h-[428px] top-[30%] rounded-lg shadow-md shadow-[#F4C43E] ">
              <div>
                <div className=" grid grid-cols-5 text-xs absolute top-[2%] left-[2%]">
                  {" "}
                  {/*อาหารคาว*/}
                  {typeof backendData.roomCart === "undefined" ? (   
                    <div className=" flex flex-col justify-center items-center">
                      <svg class="animate-spin h-5 w-5  rounded-full border-4 border-slate-600 border-r-transparent" viewBox="0 0 24 24"></svg> 
                      <p>Loading</p>
                    </div>
                    ) : (  
                        backendData.roomCart.map((data,i) =>
                          <button key={i}>
                            <img className="w-[120px] h-[120px] " key={i} src={data.imageUrl} alt=""/>
                          </button> 
                        )        
                  )}
                </div>
                <div className=" grid grid-cols-5 text-xs absolute top-[25%] left-[2%]">
                  {" "}
                  {/*ของหวาน*/}
                  {typeof backendData.roomCart === "undefined" ? (   
                    <div className=" flex flex-col justify-center items-center">
                      <svg class="animate-spin h-5 w-5  rounded-full border-4 border-slate-600 border-r-transparent" viewBox="0 0 24 24"></svg> 
                      <p>Loading</p>
                    </div>
                    ) : (  
                        backendData.roomCart.map((data,i) =>
                          <button key={i}>
                            <img className="w-[120px] h-[120px] " key={i} src={data.imageUrl} alt=""/>
                          </button> 
                        )        
                  )}
                </div>
                <div className=" grid grid-cols-5 text-xs absolute top-[45%] left-[2%]">
                  {" "}
                  {/*เครื่องกระดาษ*/}
                  {typeof backendData.roomCart === "undefined" ? (   
                    <div className=" flex flex-col justify-center items-center">
                      <svg class="animate-spin h-5 w-5  rounded-full border-4 border-slate-600 border-r-transparent" viewBox="0 0 24 24"></svg> 
                      <p>Loading</p>
                    </div>
                    ) : (  
                        backendData.roomCart.map((data,i) =>
                          <button key={i}>
                            <img className=" w-[120px] h-[120px] " key={i} src={data.imageUrl} alt=""/>
                          </button> 
                        )        
                  )}
                </div>
              </div>
              <div>
                <div className="absolute top-[70%] left-[43%] w-24 h-28">
                  <div className=" absolute w-24 h-12 rounded-full bg-[#964B00] mt-[50px]" onClick={()=>setIsBurning(!isBurning)}>
                      <div className=" absolute w-3/5 h-3 bg-[#333] top-12 left-[19px] rounded-t-md"></div> {/* base*/} 
                      {isBurning ? (
                       <img className="absolute bottom-12 w-24 h-[52px]" src={require("../image/incense.gif")}/>
                      ):(
                        <img className="absolute bottom-12 w-24 h-[52px]" src={require("../image/incense.png")}/>
                      ) }
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
        <div className=" flex flex-row justify-between mb-5 ">
          <div>
            <button class=" absolute w-[200px] h-[200px] bottom-[2%] left-[10%]  hover:scale-110" onClick={() => setIsActive(!isActive)}>
              <img
                className=" w-[200px] h-[200px] "
                src={require("../image/fireImg.png")}
                alt="fire"
              ></img>
            </button>
            {/* fire page */}
            {isActive && (  
              <div className="justify-center flex overflow-x-hidden overflow-y-auto absolute z-30 inset-0 right-[25%] left-[25%] top-5 bottom-28 bgF ">
                <div className=" flex flex-col items-center">
                  <div className="flex flex-row">
                    <div className=" absolute inset-0 left-2 top-2 hover:cursor-pointer w-10 h-10" onClick={()=>setIsActive(!isActive)}><img className=" w-10 h-10" src={require("../image/close.png")}/></div>
                    <div className="relative mt-14 h-96 w-96 rounded-md shadow-xl" droppable onDragOver={draggingOver} onDrop={dragDropped}> {/* fire (drop)*/}
                      <img className="absolute w-96 h-96 rounded-md" src={require("../image/fireplace-fire.gif")}></img>
                      <img className="absolute w-96 h-96 rounded-md hover:-translate-y-28 hover:h-[500px] hover:delay-200" src={require("../image/fireplace-fire.gif")}/>
                    </div> 
                  </div>    
                  <div className="  pb-3 w-[700px] h-[120px] bg-[#ECD9B8] border-2 border-[#FCC5BB] absolute bottom-5 shadow-lg">
                    <div className=" p-2 flex flex-row gap-3">  {/*เครื่องกระดาษ drag*/}  
                      {typeof backendData.roomCart === "undefined" ? (   
                        <div className=" flex flex-col justify-center items-center">
                          <svg class="animate-spin h-5 w-5  rounded-full border-4 border-slate-600 border-r-transparent" viewBox="0 0 24 24"></svg> 
                          <p>Loading</p>
                        </div>
                      ) : (  
                        backendData.roomCart.map((data,i) => 
                          <button key={i} id={data.id} draggable onDragStart={()=>dragStarted(data.id) 
                          }>
                            <img id={data.id} className="w-[100px] h-[100px] " key={i} src={data.imageUrl} alt=""/>
                          </button> 
                        )        
                      )} 
                    </div>   
                  </div>   
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end items-end ml-24  mr-2 ">
            {" "}
            {/* toolbar/ video me*/}
            <div className="flex justify-self-center pl-2 rounded-full  border-0 shadow-md bg-[#E9A327] mr-5">
              {" "}
              {/* toolbar*/}
              <button class=" w-12 h-9" onClick={() => setVideo(!isVideo)}>
                {isVideo ? (
                  <img
                    className=" w-6 h-6"
                    src={require("../image/video.png")}
                    alt="video"
                  ></img>
                ) : (
                  <img
                    className=" w-6 h-6"
                    src={require("../image/no-video.png")}
                    alt="no video"
                  ></img>
                )}
              </button>
              <button class=" w-12 h-9" onClick={() => setVoice(!isVoice)}>
                {isVoice ? (
                  <img
                    className=" w-6 h-6"
                    src={require("../image/voice (1).png")}
                    alt="no voice"
                  ></img>
                ) : (
                  <img
                    className=" w-6 h-6"
                    src={require("../image/voice.png")}
                    alt="voice"
                  ></img>
                )}
              </button>
              {/* <button class=" w-12 h-9" onClick={()=>setChat(!chat)}>
                <img
                  className=" w-6 h-6"
                  src={require("../image/chat.png")}
                  alt="chat"
                ></img>
              </button>
              {chat &&(
                <div className=" w-64 h-72 bg-rose-200 absolute bottom-20 right-64 rounded-sm">
                  <div className=" relative flex flex-col">
                    <div className="  flex flex-row absolute top-0 h-12">
                      <p className=" text-base ml-4 mt-2"> แชท </p>
                      <button onClick={()=>setChat(false)}><img className=" w-9 h-9 ml-[170px] mb-2" src={require("../image/close.png")} /></button>
                    </div>

                    <div className=" absolute h-48 w-60 left-2 border-2 border-rose-400 top-10"></div>

                    <div className=" absolute flex flex-row justify-between h-12 w-64 top-60">
                      <input className=" w-48 h-10 rounded-md ml-2 mt-1"></input>
                      <button className=" w-10 h-10 ml-2 bg-rose-500 rounded-md mr-2 mt-1"></button>
                    </div>
                  </div>
                </div>
              )} */}
              
              <button class=" w-12 h-9 " onClick={() => setMember(!member)}>
                <img
                  className=" w-6 h-6"
                  src={require("../image/user-group.png")}
                  alt="user"
                ></img>
              </button>
              {member && (
                <div className=" z-50 w-[200px] h-[250px] bg-[#F4C43E] border-[2px] border-[#A80109] shadow-md absolute bottom-20 right-[13.5%] rounded-sm ">
                  <p className=" absolute top-[1%] left-[34%] text-[18px] text-center">สมาชิก({/*number in room */})</p>
                  {/* <div className="w-[180px] h-[1px] border-[1px] border-[#8C8581] opacity-10 absolute top-[12.5%] left-[3%]"></div> */}
                  <div className="overflow-hidden hover:overflow-y-auto  "> 
                    <div className=" absolute top-[15%]  flex flex-col divide-y-[1px] divide-[#8C8581] w-[200px] h-[30px] shadow-md p-[4px] "> 
                      <div className=" ">
                        {/*member in meething */}
                        piyawan kornthong
                      </div>
                    </div>
                  </div>  
                </div>
              )}
              <button class=" w-12 h-9">
                <img
                  className=" w-7 h-7"
                  src={require("../image/call-end.png")}
                  alt="call end"
                ></img>
              </button>
            </div>
            <div className="box-content h-32 w-44  p-2 ">
              {" "}
              {/* video me*/}
              <video ref={userVideo} muted={true} autoPlay={true} />
            </div>
          </div>
        </div>
        {/* <div class="main-wrapper">
                  <div id="video-grid"></div>
              </div> */}
        {/* <div class="dialogue-container">
                  <div class="dialogue-head">
                      <p class="dialogue-title">Your meeting's ready</p>
                      <button id="close-dialogue" class="dialogue-button">
                          <ion-icon name="close-outline"></ion-icon>
                      </button>
                  </div>
                  <div class="dialogue-body">  **share link meeting**
                      <p>Share this meeting link with others you want in the meeting</p>
                      <div class="share-container">
                          <p class="share-link">meet.google.com/sij-dwa-zjm</p>
                          <button id="copy-button" class="dialogue-button tooltip" tool_tip="copy"
                              meeting_link="meet.google.com/sij-dwa-zjm">
                              <ion-icon name="copy-outline"></ion-icon>
                          </button>
                      </div>
                      <p class="caption">Joined as <%= user.name %>
                      </p>
                  </div>
              </div> */}
        {/* <div id="chat-panel" class="chat-box-wrapper">
                  <div class="chat-box-header">
                      <div class="chat-box-headline">
                          <ion-icon name="chatbox-outline"></ion-icon>
                          <span>Chat</span>
                      </div>
                      <button id="chat-close-button" class="cross-button">
                          <ion-icon name="close-outline"></ion-icon>
                      </button>
                  </div>
                  <div class="chat-box">

                  </div>
                  <div class="chat-box-control">
                      <form class="chat-input-wrapper">
                          <div class="input-box-wrapper" chat-id="asdf">
                              <input type="text" class="chat-input" id="chat-input" placeholder="Send Message"/>
                          </div>
                          <button type="submit" class="chat-input-button">
                              <ion-icon name="send-outline"></ion-icon>
                          </button>
                      </form>
                  </div>
              </div> */}
        {/* <div className={classes.img}>
          <DragMove onDragMove={handleDragMove}>
            <div
              style={{
                transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
              }}
            >
              <img src={logo} alt="logo"/>
            </div>
          </DragMove>
        </div> */}

        {/* <div>
                  <Animate 
                      play={state.play}
                      duration={1}
                      delay={0.3}
                      start={{
                        transform: "translateX(0px)"
                      }}
                      end={{ transform: "translateX(200px)" }}
                  >
                      <div className={classes.img}>
                          <img src={logo} alt="logo"/>
                      </div>
                  </Animate>
                  <button
                      onClick={() => this.setState(({ play }) => ({ play: !play }))}
                      >
                      Play
                  </button>
              </div> */}
      </div>
    </div>
  );
};
export default RoomMeet;
