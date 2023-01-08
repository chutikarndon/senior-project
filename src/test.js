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