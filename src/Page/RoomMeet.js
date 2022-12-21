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
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false);
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
        <div className="flex flex-col">            
            <div className="flex flex-row justify-between mt-4 ml-6 mr-4">  {/* Header*/}    
                <div > {/* sidebar*/}
                    <Button
                        onClick={() => setShowModal(true)}
                        class="overflow-hidden rounded-full w-16 h-10 flex justify-center items-center hover:cursor-pointer" startIcon={<HomeOutlined fontSize="small"/>}>     
                    </Button>
                    {showModal?(
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-8/12 h-5/6 mt-8 ml-32">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
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
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                I always felt like I could do anything. That’s the main
                                                thing people are controlled by! Thoughts- their perception
                                                of themselves! They're slowed down by their perception of
                                                themselves. If you're taught you can’t do anything, you
                                                won’t do anything. I was taught I could do everything.
                                            </p>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>    
                    ): null}
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
        </div>
    )
}
export default RoomMeet;