import React, { useRef, useState, useEffect } from "react";
import DragMove from "../DragMove";
// import { InfoBox } from "../infoBox";
// import { Animate } from "react-simple-animate";
// import logo from "../logo.svg";
import { Button, makeStyles, requirePropFactory } from "@material-ui/core";
import {
  AccountCircleOutlined,
  ChatOutlined,
  KeyboardVoiceOutlined,
  CallEndOutlined,
  VideocamOutlined,
  SettingsOutlined,
  WhatshotOutlined,
  HomeOutlined,
} from "@material-ui/icons";
import { json } from "react-router-dom";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";

const ENDPOINT = "http://localhost:7000";
const useStyles = makeStyles((theme) => ({
  button: {
    height: "5px",
    width: "3px",
  },
  activeUsersContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeUserContainer: {
    borderColor: "gray",
    borderWidth: 200,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
}));
const RoomMeet = ({ socket }) => {
  const [isActive, setIsActive] = useState(false);
  const [isVoice, setVoice] = useState(false);
  const [isVideo, setVideo] = useState(false);

  const [backendData, setBackendData] = useState([]);
  useEffect(() => {
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const [currentTab, setCurrentTab] = useState("1");
  const tabs = [
    {
      id: 1,
      tabTitle: "1",
      // <img className=" w-6 h-6" src={require("../image/rice.png")} alt="rice"></img>
      content: (
        <div className=" grid grid-cols-4 gap-3 text-xl">
          <button className=" flex flex-col items-center container bg-red-100 rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center">เป็ด</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">ไก่</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">หมูสามชั้น</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">ปลา</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">ผัดหมี่ซั่ว</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">ต้มจืด</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">พะโล้</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">ปลาหมึกแห้ง</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className="w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">ผัดหน่อไม้กุ้ง</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className="w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">ข้าวสวย</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">ชาจีน</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">น้ำเปล่า</p>
          </button>
        </div>
      ),
    },
    {
      id: 2,
      tabTitle: 2,
      //  <img className=" w-6 h-6" src={require("../image/orange (1).png")} alt=" dessert"></img>,

      content: (
        <div className=" grid grid-cols-4 gap-3 text-xl">
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">ขนมสาลี</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">ขนมไข่</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">ถ้วยฟู</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">จันทร์อับ</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">กัวท้อ</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className="w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">ซาลาเปา</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">ขนมเข่ง</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">ขนมเทียน</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/orange.png")}
            ></img>
            <p className=" text-center pb-1">ส้ม</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className="w-36 h-36"
              src={require("../image/apple.png")}
            ></img>
            <p className=" text-center pb-1">แอปเปิ้ล</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/grape.png")}
            ></img>
            <p className=" text-center pb-1">องุ่น</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/banana.png")}
            ></img>
            <p className=" text-center pb-1">กล้วยหอม</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/pomelo.png")}
            ></img>
            <p className=" text-center pb-1">ส้มโอ</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/pomelo.png")}
            ></img>
            <p className=" text-center pb-1">แก้วมังกร</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/pomelo.png")}
            ></img>
            <p className=" text-center pb-1">สาลี</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/pomelo.png")}
            ></img>
            <p className=" text-center pb-1">สัปปะรด</p>
          </button>
        </div>
      ),
    },
    {
      id: 3,
      tabTitle: 3,
      //     <img className=" w-6 h-6" src={require("../image/firecracker (1).png")} alt="firecracker"></img>,
      content: (
        <div className=" grid grid-cols-4 gap-3 text-xl">
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/banana.png")}
            ></img>
            <p className=" text-center pb-1">เสื้อผ้า</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className="w-36 h-36"
              src={require("../image/banana.png")}
            ></img>
            <p className=" text-center pb-1">ใบเบิกทาง</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/banana.png")}
            ></img>
            <p className=" text-center pb-1">เงินทอง</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/banana.png")}
            ></img>
            <p className=" text-center pb-1">ของเครื่องใช้</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/banana.png")}
            ></img>
            <p className=" text-center pb-1">กิมจั้ว</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/banana.png")}
            ></img>
            <p className=" text-center pb-1">ธนบัตรยมโลก</p>
          </button>
          <button className=" flex flex-col items-center container bg-white rounded">
            <img
              className=" w-36 h-36"
              src={require("../image/banana.png")}
            ></img>
            <p className=" text-center pb-1">ตั่วกิม</p>
          </button>
        </div>
      ),
    },
    {
      id: 4,
      tabTitle: 4,
      // <img className=" w-6 h-6" src={require("../image/shoppingCart.png")} alt="shopping cart"></img>,
      content: (
        <div>
          <div className=" grid grid-cols-4 gap-3 text-xs">
            {typeof backendData.data === "undefined" ? (
              <p>Loading...</p>
            ) : (
              backendData.data.map((data, i) => (
                <button
                  key={i}
                  className=" flex flex-col items-center container bg-white rounded"
                >
                  <img className=" w-36 h-36" key={i} src={data.image} alt="" />
                  {/* <p className=" w-36 h-36" key={i}>{data.image}</p> */}
                  <p className=" text-center text-xl pb-1" key={i}>
                    {data.productname}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      ),
    },
  ];
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };
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

  const [response, setResponse] = useState("");
  const [username, setUsername] = useState();
  const [roomId, setRoomId] = useState();
  const [activeUsers, setActiveUsers] = useState();
  const [startCamera, setStartCamera] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
      withCredentials: true,
    });
    socket.on("connection", () => console.log("connected"));
    socket.emit("joinroom", location.state.roomId, location.state.username);
    socket.on("all-user", (users) => {
      console.log("Active Users");
      setActiveUsers(users);
    });
    return () => socket.disconnect();
  }, []);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  // const joinRoom = () => {
  //   socket.emit("joinroom", { roomId: location.state.roomId, username: location.state.username });
  // };

  const webcamRef = React.useRef(null);
  return (
    <div>
      <div className="flex flex-row justify-between items-start mt-10 ml-12 mr-4">
        {" "}
        {/* Header*/}
        <div className=" container w-12 bg-amber-300 shadow-md overflow-hidden border-spacing-1 rounded-t-lg">
          {" "}
          {/* sidebar*/}
          <div>
            <button
              class=" rounded-full w-12 h-14 flex justify-center items-center hover:cursor-pointer"
              onClick={() => setIsActive(!isActive)}
            >
              <img
                className=" w-9 h-9"
                src={require("../image/home.png")}
                alt="home"
              ></img>
            </button>
          </div>
          {isActive && (
            <div className=" h-20 visible transition absolute">
              <div className="container w-12 h-64 bg-amber-300 shadow-md overflow-hidden border-spacing-1 rounded-b-lg">
                <div className=" flex justify-center items-center border-spacing-12 w-12 pt-5 ">
                  <div className=" flex flex-col justify-between items-center space-y-7">
                    {tabs.map((tab, i) => (
                      <button
                        key={i}
                        id={tab.id}
                        disabled={currentTab === `${tab.id}`}
                        onClick={handleTabClick}
                        className=" w-12 h-8 hover:bg-amber-500"
                      >
                        {tab.tabTitle}
                      </button>
                    ))}
                  </div>
                  <div className="flex snap-y w-138 h-128 absolute inset-0 z-50 mx-96 my-1 bg-red-400 p-3 rounded">
                    {tabs.map((tab, i) => (
                      <div key={i} id={tab.id} className=" overflow-y-auto">
                        {currentTab === `${tab.id}` && <div>{tab.content}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className=" overflow-x-auto">
          {" "}
          {/* other user*/}
          <div className=" flex flex-row gap-3 p-2">
            <div className=" w-44 h-32">
              {/*{activeUsers.map((user, index) => (
                <view key={index} style={useStyles.activeUserContainer}>
                  <text style={{ color: "black" }}>{user}</text>
                </view> 
              ))} */}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center mt-96">
        {" "}
        {/* middle*/}
        กระถางธูป
      </div>
      <div>
        <div className="flex justify-between items-end ml-24 mr-2 mt-16">
          {" "}
          {/* toolbar/ video me*/}
          <div className="flex justify-self-center pl-2 rounded-full box-content h-10 w-80 border-0 shadow-md bg-amber-100 ">
            {" "}
            {} {/* toolbar*/}
            <button class=" w-14 h-9">
              <img
                className=" w-6 h-6"
                src={require("../image/fire.png")}
                alt="fire"
              ></img>
            </button>
            <button class=" w-14 h-9">
              <img
                className=" w-6 h-6"
                src={require("../image/settings.png")}
                alt="settings"
              ></img>
            </button>
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
            <button class=" w-14 h-9">
              <img
                className=" w-6 h-6"
                src={require("../image/user.png")}
                alt="user"
              ></img>
            </button>
          </div>
          <div className="box-content h-32 w-44 border-2 p-2 ">
            {" "}
            {/* video me*/}
            <Webcam
              audio={true}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            />
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
