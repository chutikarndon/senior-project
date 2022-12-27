import React, {useState} from "react";
import DragMove from "../DragMove";
// import { Animate } from "react-simple-animate";
// import logo from "../logo.svg";
import { Button, makeStyles} from "@material-ui/core";
import {AccountCircleOutlined, ChatOutlined, KeyboardVoiceOutlined, CallEndOutlined, VideocamOutlined, SettingsOutlined, WhatshotOutlined, HomeOutlined} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
   button: {
    height: '5px',
    width: '3px'
   }
}));
const RoomMeet = () => {
    const [isActive, setIsActive] = useState(false);
    const classes = useStyles();
    // const state = {play: false};
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
      
    return(
        <div>            
            <div className="flex flex-row justify-between items-start mt-4 ml-6 mr-4">  {/* Header*/}
                <div className=" container w-16 bg-gray-50 shadow-md overflow-hidden border-spacing-1"> {/* sidebar*/}
                    <div >
                        <Button class="overflow-hidden rounded-full w-16 h-10 flex justify-center items-center hover:cursor-pointer" onClick={() => setIsActive(!isActive)} startIcon={<HomeOutlined fontSize="small"/>}> </Button>
                    </div> 
                    {isActive && 
                        <div className=" absolute h-10">
                            <div className=" flex justify-items-start border-spacing-1 w-16 h-3">
                                <p>Item 1</p>
                            </div>
                            <div className=" flex justify-items-start border-spacing-1 w-16 h-3">
                                <p>Item 2</p>
                            </div>
                            <div className=" flex justify-items-start border-spacing-1 w-16 h-3">
                                <p>Item 3</p>
                            </div>
                        </div>
                    }
                </div>               
                <div className=" overflow-x-hidden">      {/* other user*/}
                    other users video
                    <div className=" grid gap-2 grid-cols-none"></div>
                </div>       
            </div> 
            <div className=" flex justify-center mt-48">   {/* middle*/}
                กระถางธูป
            </div>
            <div>
            <div className="flex justify-between items-end ml-4 mr-2 mt-6">   {/* toolbar/ video me*/}
                <div className="rounded-full box-content h-7 w-56 border-0 shadow-md bg-red-200 ">  {/* toolbar*/}
                    <div className=" flex">           
                        <Button class=" flex-none w-8" className={classes.button} startIcon={<WhatshotOutlined fontSize="small"/>} ></Button>
                        <Button class=" flex-none w-8" className={classes.button} startIcon={<SettingsOutlined fontSize="small"/>}></Button>
                        <Button class=" flex-none w-8" className={classes.button} startIcon={<VideocamOutlined fontSize="small"/>}></Button>
                        <Button class=" flex-none w-8" className={classes.button} startIcon={<CallEndOutlined fontSize="small"/>}></Button>
                        <Button class=" flex-none w-8" className={classes.button} startIcon={<KeyboardVoiceOutlined fontSize="small"/>}></Button>
                        <Button class=" flex-none w-8" className={classes.button} startIcon={<ChatOutlined fontSize="small"/>}></Button>
                        <Button class=" flex-none w-8" className={classes.button} startIcon={<AccountCircleOutlined fontSize="small"/>}></Button>
                    </div>
                </div>
                <div className="box-content h-10 w-20 border-2 p-2 ">           {/* video me*/}
                    me
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
                    <div  style={{transform: `translateX(${translate.x}px) translateY(${translate.y}px)`}}>
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
    )
}
export default RoomMeet;