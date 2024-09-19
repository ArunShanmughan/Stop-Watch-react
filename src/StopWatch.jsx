import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
  const [isRunning, setIsrunning] = useState(false);
  const [lapsedTime, setLapsedTime] = useState(0);
  const [laps, setLaps] = useState([]); // State to store laps
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setLapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function Start() {
    setIsrunning(true);
    startTimeRef.current = Date.now() - lapsedTime;
  }

  function Reset() {
    setLapsedTime(0);
    setIsrunning(false);
    setLaps([]); // Clear laps when reset
  }

  function Pause() {
    setIsrunning(false);
  }

  function TakeLap() {
    if(isRunning){
    setLaps([...laps, lapsedTime]);
    }
  }

  function FormatTime(time) {
    let minutes = Math.floor(time / (1000 * 60) % 60);
    let seconds = Math.floor(time / 1000 % 60);
    let milliSeconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds}:${milliSeconds}`;
  }

  return (
    <div className="outer-block">
    <div className="Watch-container">
      <div className="display">
        {FormatTime(lapsedTime)}
      </div>
      <div className="controls">
        <button onClick={Start} className="start-button">Start</button>
        <button onClick={Reset} className="reset-button">Reset</button>
        <button onClick={Pause} className="pause-button">Pause</button>
        <button onClick={TakeLap} className="lap-button">Lap</button> {/* New Lap button */}
        <br />
      </div>
      <div className="laps-container">
        <h3>Laps</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {FormatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default StopWatch;
