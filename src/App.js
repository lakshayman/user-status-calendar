import "./App.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const status = {
  startTime: 1704736800000,
  status: "IDLE"
}

const logs = [
  {
    startTime: 1702121303000,
    endTime: 1702359023000,
    status: "IDLE"
  },
  {
    startTime: 1702359023000,
    endTime: 1702987200000,
    status: "ACTIVE"
  },
  {
    startTime: 1702987200000,
    endTime: 1703310331000,
    status: "IDLE"
  },
  {
    startTime: 1703310331000,
    endTime: 1704260731000,
    status: "OOO"
  },
  {
    startTime: 1704260731000,
    endTime: 1704642331000,
    status: "ACTIVE"
  },
  {
    startTime: 1704642331000,
    endTime: 1704736800000,
    status: "OOO"
  },
];

const processData = () => {
  const data = {};
  const currentStatus = status;

  const d = new Date();
  const todayStartingTime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  if(currentStatus.startTime < todayStartingTime) {
    currentStatus["endTime"] = todayStartingTime - 1;
  }

  function getDatesInRange(startDate, endDate) {
    let date = new Date(startDate.getTime());
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    date.setDate(date.getDate() + 1)
  
    const dates = [];
  
    while (date < new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())) {
      dates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }

  const processSingleEntity = (obj) => {
    const startTime = new Date(obj.startTime)
    const endTime = new Date(obj.endTime)
    // console.log(startTime)
    // console.log(endTime)
    const dates = getDatesInRange(new Date(obj.startTime), new Date(obj.endTime));
    // console.log(dates);
    const endDate = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())
    // console.log(endTime.getTime() - endDate.getTime(), endTime, endDate)

    const startDate = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())
    startDate.setDate(startDate.getDate() + 1);
    // console.log(startDate.getTime() - startTime.getTime(), startTime, startDate)

    dates.forEach(date => {
      data[date.getTime()] = {partial: false, status: obj.status};
    })

  }

  logs.forEach(log => processSingleEntity(log))
  // console.log(data);
  return data
}

function App() {
  const [value, onChange] = useState(new Date());
  const [processedData, setProcessedData] = useState(processData());
  

  // useEffect(()=>{

  // },[])

  const setTileClassName = ({ activeStartDate, date, view }) => {

    // console.log(processedData)
    if(processedData[date.getTime()]) {
      console.log(processedData[date.getTime()], date.getTime())
      if(!processedData[date.getTime()].partial)
        return processedData[date.getTime()].status;
    }
    // const color = '#9EE3B4';
    // var style = document.createElement("style");
    // var clas = null;
    // style.type = "text/css";
    // style.innerHTML = `.react-calendar .wednesday {
    //   background: linear-gradient(
    //     to right,
    //     #D2686E 0%,
    //     #D2686E 50%,
    //     ${color} 50%,
    //     ${color} 100%
    //   );
    // }`;
    // document.getElementsByTagName("head")[0].appendChild(style);
    // if(date.getTime() >= 1704047400000 && date.getTime() <= 1704479400000  && date.getTime() !== new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime()) {
    //   clas = 'ooo'
    // }
    // if(date.getTime() === 1704738600000) clas = 'wednesday'
    // return clas 
    return null
  }
    

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={(value, event) =>
          console.log(
            "Clicked day: ",
            value.getTime(),
          )
        }
        tileClassName={setTileClassName}
        view="month"
      />
    </div>
  );
}

export default App;
