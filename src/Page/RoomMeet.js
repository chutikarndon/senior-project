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

  /*drag move fire page */
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });
  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

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

  return (
    <div className=" bg-backgroundRoommeet bg-repeat bg-cover">
      <div className=" flex flex-col justify-items-center h-screen">
        <div className="flex flex-row justify-between items-start mt-10 ml-12 mr-4 h-5/6 ">
          {" "}
          {/* Header*/}
          <div>
            {/*tab menu */}
            <div className=" container w-12 bg-amber-300 shadow-md overflow-hidden border-spacing-1 rounded-t-lg">
                  <div>
                      <button className=" rounded-full w-12 h-14 flex justify-center items-center hover:cursor-pointer" onClick={() => setMenu(!isMenu)}><img className=" w-9 h-9" src={require("../image/shoppingCart.png")} alt=""></img></button>
                  </div>
                  {isMenu &&
                      <div className=" h-20 visible transition absolute">
                          <div className="container w-12 h-80 bg-amber-300 shadow-md overflow-hidden border-spacing-1 rounded-b-lg">
                              <div className=" flex justify-center items-center border-spacing-12 w-12 pt-5 ">
                                  <div className=" flex flex-col justify-between items-center w-12 space-y-7" role="tablist">
                                      <button
                                          className={
                                          "w-12 h-10 rounded flex justify-center " +
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
                                          <img className=" w-9 h-9" src={require("../image/riceBowl.png")} alt="rice"/>
                                      </button>
                                      <button
                                          className={
                                          "w-12 h-10 rounded flex justify-center " +
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
                                          <img className=" w-9 h-9" src={require("../image/fruit.png")} alt=" dessert"/>
                                      </button>
                                      <button
                                          className={
                                          "w-12 h-10 rounded flex justify-center " +
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
                                          <img className=" w-9 h-9" src={require("../image/fire-cracker.png")} alt="firecracker"/>
                                      </button>
                                      <button
                                          className={
                                          "w-12 h-10 rounded flex justify-center " +
                                          (openTab === 4
                                              ? "bg-amber-200"
                                              : " bg-amber-300")
                                          }
                                          onClick={e => {
                                          e.preventDefault();
                                          setOpenTab(4);
                                          fetchData();
                                          }}
                                          data-toggle="tab"
                                          href="#link4"
                                          role="tablist"
                                      >
                                          <img className=" w-9 h-9" src={require("../image/table.png")} alt="shopping cart"/>
                                      </button>
                                  </div>
                                  <div className="flex snap-y w-138 h-128 absolute inset-0 z-50 mx-96 my-1 bg-red-400 p-3 rounded">
                                      <div className=" overflow-y-auto overflow-x-hidden ">
                                          <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                              <div className=" grid grid-cols-4 gap-3 text-xl">
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl " handleClick={handleClick} id={"0"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center" >เป็ด</p>  
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"1"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt="" />
                                                      <p className=" text-center pb-1" >ไก่</p>                   
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"2"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">หมูสามชั้น</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"3"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">ปลา</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"0"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">ผัดหมี่ซั่ว</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"4"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">ต้มจืด</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"5"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/> 
                                                      <p className=" text-center pb-1">พะโล้</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"6"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">ปลาหมึกแห้ง</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"7"}>
                                                      <img className="w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">ผัดหน่อไม้กุ้ง</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"8"}>
                                                      <img className="w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">ข้าวสวย</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"9"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">ชาจีน</p>
                                                  </button>
                                                  <button className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl" handleClick={handleClick} id={"10"}>
                                                      <img className=" w-36 h-36" src={require("../image/grape.png")} alt=""/>
                                                      <p className=" text-center pb-1">น้ำเปล่า</p>
                                                  </button>
                                              </div> 
                                          </div>
                                          <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                              <div className=" grid grid-cols-4 gap-3 text-xl">
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
                                    className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    onClick={handleClick}
                                    id={data.id}
                                  >
                                    <img
                                      className=" w-36 h-36"
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
                          <div
                            className={openTab === 3 ? "block" : "hidden"}
                            id="link3"
                          >
                            <div className=" grid grid-cols-4 gap-3 text-xl">
                              <button
                                className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                handleClick={handleClick}
                                id={"27"}
                              >
                                <img
                                  className=" w-36 h-36"
                                  src={require("../image/banana.png")}
                                  alt=""
                                />
                                <p className=" text-center pb-1">เสื้อผ้า</p>
                              </button>
                              <button
                                className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                handleClick={handleClick}
                                id={"28"}
                              >
                                <img
                                  className="w-36 h-36"
                                  src={require("../image/banana.png")}
                                  alt=""
                                />
                                <p className=" text-center pb-1">ใบเบิกทาง</p>
                              </button>
                              <button
                                className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                handleClick={handleClick}
                                id={"29"}
                              >
                                <img
                                  className=" w-36 h-36"
                                  src={require("../image/banana.png")}
                                  alt=""
                                />
                                <p className=" text-center pb-1">เงินทอง</p>
                              </button>
                              <button
                                className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                handleClick={handleClick}
                                id={"30"}
                              >
                                <img
                                  className=" w-36 h-36"
                                  src={require("../image/banana.png")}
                                  alt=""
                                />
                                <p className=" text-center pb-1">
                                  ของเครื่องใช้
                                </p>
                              </button>
                              <button
                                className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                handleClick={handleClick}
                                id={"31"}
                              >
                                <img
                                  className=" w-36 h-36"
                                  src={require("../image/banana.png")}
                                  alt=""
                                />
                                <p className=" text-center pb-1">กิมจั้ว</p>
                              </button>
                              <button
                                className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                handleClick={handleClick}
                                id={"32"}
                              >
                                <img
                                  className=" w-36 h-36"
                                  src={require("../image/banana.png")}
                                  alt=""
                                />
                                <p className=" text-center pb-1">ธนบัตรยมโลก</p>
                              </button>
                              <button
                                className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                handleClick={handleClick}
                                id={"33"}
                              >
                                <img
                                  className=" w-36 h-36"
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
                            <div className=" grid grid-cols-4 gap-3 text-xs">
                              {typeof backendData.roomCart === "undefined" ? (
                                <p>Loading...</p>
                              ) : (
                                backendData.roomCart.map((data, i) => (
                                  <button
                                    key={i}
                                    className=" flex flex-col items-center container bg-white rounded transition ease-in-out hover:bg-red-100 shadow-xl"
                                    onClick={() => {
                                      setIsDeleteMenuOpen(true);
                                      setPid(data.id);
                                    }}
                                    id={data.id}
                                  >
                                    <img
                                      className=" w-36 h-36"
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
                              <div className="flex flex-col items-center w-56 h-24 bg-white absolute inset-0 top-52 left-52 p-2 rounded-md">
                                <p className="text-center">
                                  Are you sure you want to delete
                                </p>
                                <div className=" flex flex-row">
                                  <button
                                    className=" mt-1 w-7 h-7 rounded-md bg-orange-200 hover:border-2 border-orange-50"
                                    onClick={() => handleDelete()}
                                  >
                                    <img src={require("../image/delete.png")} />
                                  </button>
                                  <button
                                    className=" mt-1 ml-2 w-7 h-7 rounded-md bg-orange-200 hover:border-2 border-orange-50"
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
            <button class=" w-14 h-14" onClick={() => setSetting(!setting)}>
              <img
                className=" w-7 h-7 hover:border"
                src={require("../image/settings.png")}
                alt="settings"
              ></img>
            </button>
            {setting && (
              <div className="w-40 h-44 bg-slate-500 absolute rounded-sm right-10"></div>
            )}
          </div>
        </div>
        <div className=" flex justify-center">
          {" "}
          {/* middle*/}
          <div className=" flex justify-center w-2/5  h-full rounded-full">
            <div className=" flex flex-col justify-center items-center relative">
              <div className=" mt-[160px]">
                <div className=" grid grid-cols-5 text-xs">
                  {" "}
                  {/*อาหารคาว*/}
                  {typeof backendData.data === "undefined" ? (
                    <p><svg className=' animate-spin w-5 h-5'></svg></p>
                  ) : (
                    backendData.data.map((data, i) => (
                      <div key={i}>
                        <img className=" w-18 h-18" key={i} src={data.image} alt="" />
                      </div>
                    ))
                  )}
                </div>
                <div className=" grid grid-cols-5 text-xs">
                  {" "}
                  {/*ของหวาน*/}
                  {typeof backendData.data === "undefined" ? (
                    <p><svg className=' animate-spin w-5 h-5'></svg></p>
                  ) : (
                    backendData.data.map((data, i) => (
                      <div key={i}>
                        <img className=" w-18 h-18" key={i} src={data.image} alt="" />
                      </div>
                    ))
                  )}
                </div>
                <div className=" grid grid-cols-5 text-xs">
                  {" "}
                  {/*เครื่องกระดาษ*/}
                  {typeof backendData.data === "undefined" ? (
                    <p><svg className=' animate-spin w-5 h-5'></svg></p>
                  ) : (
                    backendData.data.map((data, i) => (
                      <div key={i}>
                        <img className=" w-18 h-18" key={i} src={data.image} alt="" />
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className=" mt-10">
                <div className="relative inset-0 w-24 h-28">
                  <div className=" relative w-24 h-12 rounded-full bg-[#964B00] mt-[50px]" onClick={()=>setIsBurning(!isBurning)}>
                      <div className=" absolute w-3/5 h-3 bg-[#333] top-12 left-[19px] rounded-t-md"></div> {/* base*/} 
                      {isBurning ? (
                       <img className="absolute bottom-12 w-24 h-[52px]" src={require("../image/incenseBurnerGif.gif")}/>
                      ):(
                        <img className="absolute bottom-12 w-24 h-[52px]" src={require("../image/incense.jpg")}/>
                      ) }
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
        <div className=" flex flex-row justify-between mb-5 ">
          <div className=" ml-10">
            <button class=" absolute w-60 h-60 bottom-2 hover:shadow-lg hover:rounded-full hover:border-2 hover:border-red-400 focus:border-2 focus:rounded-full" onClick={() => setIsActive(!isActive)}>
              <img
                className=" w-60 h-60 "
                src={require("../image/fireImg.png")}
                alt="fire"
              ></img>
            </button>
            {isActive && (
              <div className="justify-center flex overflow-x-hidden overflow-y-auto absolute inset-0 right-5 left-5 top-5 bottom-28 bg-[#48494B] ">
                <div className=" flex flex-col items-center">
                  <div className="flex flex-row">
                    <div className=" absolute inset-0 left-2 top-2 hover:cursor-pointer w-10 h-10" onClick={()=>setIsActive(!isActive)}><img className=" w-10 h-10" src={require("../image/close.png")}/></div>
                    <div className="relative mt-14 h-96 w-96 rounded-full"> {/* fire */}
                      <img className="absolute w-96 h-96 rounded-full" src={require("../image/fireplace-fire.gif")}></img>
                      <img className="absolute w-96 h-96 rounded-full hover:-translate-y-28 hover:h-[500px] hover:delay-200" src={require("../image/fireplace-fire.gif")}/>
                    </div> 
                  </div>    
                  <div className="  pb-3 w-138 h-36 bg-amber-100 border-2 border-amber-700 absolute bottom-5 overflow-x-auto overflow-y-hidden">
                    <div className=" p-2 flex flex-row gap-3">  {/*เครื่องกระดาษ*/}  
                      {typeof backendData.data === "undefined" ? (   
                        <div className=" flex flex-col justify-center items-center">
                          <svg class="animate-spin h-5 w-5  rounded-full border-4 border-slate-600 border-r-transparent" viewBox="0 0 24 24"></svg> 
                          <p>Loading</p>
                        </div>
                      ) : (  
                        backendData.data.map((data,i) => 
                          <div key ={i}>
                            <DragMove onDragMove={handleDragMove}>
                              <div
                                style={{
                                  transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
                                }}
                              >
                                <img
                                  className="w-32 h-32 "
                                  key={i}
                                  src={data.image}
                                  alt=""
                                />
                              </div>
                            </DragMove>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end items-end ml-24  mr-2 ">
            {" "}
            {/* toolbar/ video me*/}
            <div className="flex justify-self-center pl-2 rounded-full  border-0 shadow-md bg-amber-100 mr-5">
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
              <button class=" w-12 h-9">
                <img
                  className=" w-6 h-6"
                  src={require("../image/chat.png")}
                  alt="chat"
                ></img>
              </button>
              <button class=" w-12 h-9 " onClick={() => setMember(!member)}>
                <img
                  className=" w-6 h-6"
                  src={require("../image/user-group.png")}
                  alt="user"
                ></img>
              </button>
              {member && (
                <div className="w-40 h-44 bg-slate-500 absolute bottom-20 right-56 rounded-sm"></div>
              )}
              <button class=" w-12 h-9">
                <img
                  className=" w-7 h-7"
                  src={require("../image/call-end.png")}
                  alt="call end"
                ></img>
              </button>
            </div>
            <div className="box-content h-32 w-44 border-2 p-2 ">
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
        <div className={classes.img}>
          <DragMove onDragMove={handleDragMove}>
            <div
              style={{
                transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
              }}
            >
              {/* <img src={logo} alt="logo"/> */}
            </div>
          </DragMove>
        </div>
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
