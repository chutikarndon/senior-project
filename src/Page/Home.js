import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import CountdownTimer from '../CountdownTimer';

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100px",
    height: "40px",
    padding: "2px",
    backgroundColor: "orange",
  },
  buttons: {
    width: "100px",
    height: "40px",
    padding: "2px",
    backgroundColor: "orange",
  },
}));

const Home = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch("/festival").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  console.log(backendData.date)

  const [openTab, setOpenTab] = useState(1);

  const FESTIVAL_DAYS_IN_MS = new Date(backendData.date).getTime()

  const event = new Date(backendData.date);
  const option = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = FESTIVAL_DAYS_IN_MS;
  
  // const option = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  return (
    // <div className="flex flex-col items-center">
    //   <div className=" container mx-auto">
    //     <div className="flex flex-row justify-between">
    //       <div className="flex">
    //         <div className="flex-1 w-25 pt-2">
    //           <button className={" text-xl underline" + (openTab === 1)} 
    //           onClick={e => {
    //             e.preventDefault();
    //             setOpenTab(1);
    //           }}
    //           data-toggle = "Tab"
    //           href= "link1"
    //           role="tablist"
    //           >
    //               หน้าหลัก
    //           </button>
    //         </div>
    //         <div className=" flex-1 w-24 pt-2 ">
    //           <button className={" text-xl underline" + (openTab === 2)}
    //           onClick={e => {
    //             e.preventDefault();
    //             setOpenTab(2);
    //           }}
    //           data-toggle = "Tab"
    //           href= "link2"
    //           role="tablist"
    //           >
    //             เกี่ยวกับ
    //           </button>
    //         </div>
    //         <div className=" flex-1 w-24 pt-2 ">
    //           <button className={" text-xl underline" + (openTab === 3)}
    //           onClick={e => {
    //             e.preventDefault();
    //             setOpenTab(3);
    //           }}
    //           data-toggle = "Tab"
    //           href= "link3"
    //           role="tablist"
    //           >
    //             ติดต่อเรา
    //           </button>
    //         </div>
    //       </div>
    //       <div className="pt-2">
    //         <Button
    //           className={classes.button}
    //           variant="contained"
    //           onClick={() => navigate("/Login")}
    //         >
    //           <p className="text-xl">เข้าร่วม</p>
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    //   {/* <div>
    //     {typeof backendData.festival === "undefined" ? (
    //       <div><svg className=' animate-spin w-5 h-5'></svg></div>
    //     ) : (
    //       backendData.festival.map((festival, i) => <p key={i}>{festival}</p>)
    //     )}
    //   </div> */}
    //   <div>
    //     <div class=" pt-16 " className={openTab === 1 ? "block" : "hidden"} id="link1">
    //       <Button
    //         className={classes.buttons}
    //         variant="contained"
    //         onClick={() => navigate("/Signup")}
    //       >
    //         <p className="text-xl">สร้างห้อง</p>
    //       </Button>
    //     </div>
    //     <div class=" pt-16 " className={openTab === 2 ? "block" : "hidden"} id="link2">
    //       <p>เกี่ยวกับ</p>
    //     </div>
    //     <div class=" pt-16 " className={openTab === 3 ? "block" : "hidden"} id="link3">
    //       <p>ติดต่อเรา</p>
    //     </div>
    //   </div>
    // </div>
    // <div className='bg-repeat bg-[#F5F5F5] '>
    //   <div className='flex flex-col justify-center '>
    //     <div className='absolute w-full h-[900px] bg-[#EECFF9]'>
    //       banner
    //     </div>
    //     <div className=' absolute top-[68%] right-[41.6%] left-[41.67%] bottom-[52.52%]'>
    //       <p className=' text-[28px]'> เข้าร่วมพิธีได้แล้ว วันนี้ </p>
    //     </div>
    //     <div className=' flex flex-row justify-end items-end'>
    //       <button className=' absolute w-[250px] h-[350px] left-[450px] top-[80%] border-2 bg-[#FFFFFF] rounded-md hover:bg-[#CD3D3D] hover:text-white' onClick={() => navigate("/Signup")}>
    //         <img className=' absolute left-[14%] right-[13.67%] top-[7.5%] bottom-[40.75%] w-[180.83px] h-[181.13] hover:scale-110' src={require('../image/person.png')}/>
    //         <p className=' absolute left-[26.4%] right-[26.4%] top-[82%] bottom-[0%] text-[30px]'>สร้างห้อง</p>
    //       </button>
    //       <button className=' absolute w-[250px] h-[350px] left-[790px] top-[80%] border-2 bg-[#FFFFFF] rounded-md hover:bg-[#CD3D3D] hover:text-white' onClick={() => navigate("/Login")}> 
    //         <img className=' absolute left-[10.33%] right-[10.67%] top-[8.75%] bottom-[42.5%] w-[197.5px] h-[170.63] hover:scale-110' src={require('../image/people.png')}/>
    //         <p className=' absolute left-[18.4%] right-[18.8%] top-[82%] bottom-[7.43%] text-[30px]'>เข้าร่วมห้อง</p>
    //       </button>
    //     </div>
    //     <div className=' flex flex-row divide-y-5'>
    //       <p className=' text-[20px] absolute left-[645px] top-[1100px]'>เกี่ยวกับ</p>
    //       <div className=' absolute w-[38.05px] h-[0px] left-[727px] top-[1124.05px] border-1 border-[#000000]'></div>
    //       <p className=' text-[20px] absolute left-[785px] top-[1100px]'>ติดต่อเรา</p>
    //     </div>
    //   </div>
    // </div>

    <div className=" backgroundHome bg-repeat bg-cover h-screen">
      <p className='absolute text-[80px] top-[18%] left-[41.5%] text-[#A30709]'>{backendData.name}</p>
      <p className='absolute text-[50px] top-[35%] left-[35%] text-[#655F5B]'>{event.toLocaleDateString('th-TH',option)}</p>
      <div className=' absolute flex flex-row top-[53%] left-[31%] w-[550px]'>
        <div className=' absolute text-[78px] text-[#A30709]'>อีก</div>
        <div className=" absolute left-[25.5%]">
          <CountdownTimer  targetDate={dateTimeAfterThreeDays} />
        </div> 
        <div className=' absolute text-[78px] left-[95%] text-[#A30709]'>วัน</div>
      </div>  
      <button className=' absolute w-[150px] h-[60px] left-[790px] top-[75%] border-2 bg-[#CD3D3D] rounded-md hover:scale-105 hover:text-[#F4C43E]' onClick={() => navigate("/Login")}> 
        <p className=' left-[18.4%] right-[18.8%] top-[82%] bottom-[7.43%] text-[20px] text-white'>เข้าร่วมห้อง</p>
      </button>
      <button className=' absolute w-[150px] h-[60px] left-[590px] top-[75%] border-2 bg-[#CD3D3D] rounded-md hover:scale-105 hover:text-[#F4C43E]' onClick={() => navigate("/Signup")}> 
        <p className=' left-[18.4%] right-[18.8%] top-[82%] bottom-[7.43%] text-[20px] text-white'>สร้างห้อง</p>
      </button>
    </div>
  );
};
export default Home;
