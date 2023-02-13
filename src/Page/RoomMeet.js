import React, { useState, useEffect, useRef } from "react";
import DragMove from "../DragMove";
import Tabs from "../Page/Tabs";
import Fire from "../Page/Fire";
// import { InfoBox } from "../infoBox";
// import { Animate } from "react-simple-animate";
// import logo from "../logo.svg";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";


const useStyles = makeStyles((theme) => ({
  button: {
    height: "5px",
    width: "3px",
  },
}));

const RoomMeet = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [setting, setSetting] = useState(false);
  const [member, setMember] = useState(false);
  const [isVoice, setVoice] = useState(false);
  const [isVideo, setVideo] = useState(false);
  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const classes = useStyles();
  // const state = {play: false};
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

  const localVideoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState();
  const remoteVideoRefs = useRef([]);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const location = useLocation();
  const [username, setUsername] = useState();
  const roomId = location.state.roomId;
  const [activeUsers, setActiveUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  // useEffect(() => {
  //   const getDeviceMedia = async () => {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     setMediaStream(stream);
  //     if (localVideoRef.current) {
  //       localVideoRef.current.srcObject = stream;
  //     }
  //   };
  //   getDeviceMedia();
  // }, []);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
    socket.on("connection", () => console.log("connected"));
    socket.emit("joinroom", location.state.roomId, location.state.username);
    socket.on("all-users", (users) => {
      console.log("Active Users");
      console.log(users);
      setActiveUsers(users);
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setMediaStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
      });

    socket.emit("add-stream", localVideoRef);

    // if (activeUsers.length > 1) {
    //   socket.on("new-remote-stream", (stream) => {
    //     setRemoteStreams([...remoteStreams, stream]);
    //   });
    // }

    return () => socket.disconnect();
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-between items-start mt-10 ml-12 mr-4">
        {" "}
        {/* Header*/}
        <Tabs />
        <div className=" overflow-x-auto">
          {" "}
          {/* other user*/}
          {remoteStreams.map((stream, index) => (
            <video key={index} autoPlay srcObject={stream} />
          ))}
          <div className=" flex flex-row gap-3 p-2">
            <div className=" w-44 h-32"></div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center mt-16">
        {" "}
        {/* middle*/}
        <div className=" flex flex-col absolute">
          <div className=" grid grid-cols-5 gap-3 text-xs">
            {" "}
            {/*อาหารคาว*/}
            {typeof backendData.data === "undefined" ? (
              <p>Loading...</p>
            ) : (
              backendData.data.map((data, i) => (
                <div key={i}>
                  <img className=" w-14 h-14" key={i} src={data.image} alt="" />
                </div>
              ))
            )}
          </div>
          <div className=" grid grid-cols-5 gap-3 text-xs">
            {" "}
            {/*ของหวาน*/}
            {typeof backendData.data === "undefined" ? (
              <p>Loading...</p>
            ) : (
              backendData.data.map((data, i) => (
                <div key={i}>
                  <img className=" w-14 h-14" key={i} src={data.image} alt="" />
                </div>
              ))
            )}
          </div>
          <div className=" grid grid-cols-5 gap-3 text-xs">
            {" "}
            {/*เครื่องกระดาษ*/}
            {typeof backendData.data === "undefined" ? (
              <p>Loading...</p>
            ) : (
              backendData.data.map((data, i) => (
                <div key={i}>
                  <img className=" w-14 h-14" key={i} src={data.image} alt="" />
                </div>
              ))
            )}
          </div>
          กระถางธูป
        </div>
      </div>
      <div>
        <div className="flex justify-between items-end ml-24 mr-2 mt-80 ">
          {" "}
          {/* toolbar/ video me*/}
          <div className="flex justify-self-center pl-2 rounded-full box-content h-10 w-80 border-0 shadow-md bg-amber-100">
            {" "}
            {/* toolbar*/}
            <button class=" w-14 h-9" onClick={() => setIsActive(!isActive)}>
              <img
                className=" w-6 h-6"
                src={require("../image/fire.png")}
                alt="fire"
              ></img>
            </button>
            {isActive && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 right-5 left-5 top-5 bottom-28 bg-red-50">
                <Fire />
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
            <button class=" w-14 h-9" onClick={() => setVideo(!isVideo)}>
              {isVideo ? (
                <img
                  className=" w-6 h-6"
                  src={require("../image/no-video.png")}
                  alt="no video"
                ></img>
              ) : (
                <img
                  className=" w-6 h-6"
                  src={require("../image/video.png")}
                  alt="video"
                ></img>
              )}
            </button>
            <button class=" w-14 h-9">
              <img
                className=" w-7 h-7"
                src={require("../image/call-end.png")}
                alt="call end"
              ></img>
            </button>
            <button class=" w-14 h-9" onClick={() => setVoice(!isVoice)}>
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
            <button class=" w-14 h-9">
              <img
                className=" w-6 h-6"
                src={require("../image/chat.png")}
                alt="chat"
              ></img>
            </button>
            <button class=" w-14 h-9 " onClick={() => setMember(!member)}>
              <img
                className=" w-6 h-6"
                src={require("../image/user.png")}
                alt="user"
              ></img>
            </button>
            {member && (
              <div className="w-40 h-44 bg-slate-500 absolute bottom-28 left-80 rounded-sm"></div>
            )}
          </div>
          <div className="box-content h-32 w-44 border-2 p-2 ">
            {" "}
            {/* video me*/}
            <video ref={localVideoRef} autoPlay />
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
  );
};
export default RoomMeet;
