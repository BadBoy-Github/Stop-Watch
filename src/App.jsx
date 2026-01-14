import { useState, useEffect, useRef } from "react";

const App = () => {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const toggleTimer = () => {
    setRunning((prev) => !prev);
  };

  useEffect(() => {
    if (running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setSecond((s) => {
          if (s >= 59) {
            setMinute((m) => {
              if (m >= 59) {
                setHour((h) => h + 1);
                return 0;
              }
              return m + 1;
            });
            return 0;
          }
          return s + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [running]);

  const resetTimer = () => {
    setRunning(false);
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  return (
    <>
      <div className="bg-[#fef3c7] h-screen w-full flex justify-center items-center">
        <div className="w-[70%] h-[76%] bg-[#1c1917] text-amber-50 rounded-4xl shadow-2xl shadow-amber-900/10 flex flex-col justify-center items-center gap-20">
          <p className="text-lg ">Online Stop Watch</p>
          <div className="flex gap-10 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-9xl font-bold" id="hours">
                {String(hour).padStart(2, "0")}
              </h1>
              <p>Hours</p>
            </div>
            <div className="text-9xl font-bold mb-10">:</div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-9xl font-bold" id="minutes">
                {String(minute).padStart(2, "0")}
              </h1>
              <p>Minutes</p>
            </div>
            <div className="text-9xl font-bold mb-10">:</div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-9xl font-bold" id="seconds">
                {String(second).padStart(2, "0")}
              </h1>
              <p>Seconds</p>
            </div>
          </div>
          <div className="flex gap-20">
            <button
              className={`w-36 h-14 text-lg font-bold ${
                running
                  ? "bg-[#f59e0b] text-[#fef3c7 hover:bg-[#fbbf24] active:bg-[#f59e0b]"
                  : "bg-[#fef3c7] text-[#1c1917] hover:bg-[#d1c389] active:bg-[#fef3c7]"
              } rounded-full cursor-pointer hover:scale-105 active:scale-100 transition-all duration-300`}
              onClick={toggleTimer}
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              className="w-36 h-14 text-lg bg-[#800c0c] font-semibold rounded-full cursor-pointer hover:bg-[#a90b0b] hover:scale-105 active:bg-[#800c0c] active:scale-100 transition-all duration-300"
              onClick={resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
