import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './hooks/useCountdown';

const ExpiredNotice = () => {
  return (
    <div className=" p-8 m-2">
      <span className=' text-[50px] text-[#A30709]'>Expired!!!</span>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className=" p-2">
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        className=" flex flex-row justify-center items-center text-[30px] p-2 space-x-4 text-[#A30709]"
      >
        <DateTimeDisplay value={days} type={'วัน'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'ชั่วโมง'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'นาที'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'วินาที'} isDanger={false} />
      </a>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
