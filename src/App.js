import { useEffect, useState } from "react";
import "./App.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";

function App() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  const [value, setValue] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    var timer = null;
    if (running) {
      timer = setInterval(() => {
        if (hour === 0 && min === 0 && sec === 0) {
          setMin(0);
          setSec(0);
          setHour(0);
          clearInterval(timer);
        } else if (min > 60) {
          setHour((prev) => prev + 1);
          setMin((prev) => prev - 60);
        } else if (min > 0 && sec === 0) {
          setMin((prev) => prev - 1);
          setSec(59);
        } else if (hour > 0 && min === 0 && sec === 0) {
          setHour((prev) => prev - 1);
          setMin(60);
        } else if (sec >= 0) {
          setSec((prev) => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  });

  const handleChange = (e) => {
    setHour(0);
    setMin(0);
    setSec(0);
    setRunning(false);
    setValue(e.target.value);
    setMin(e.target.value);
  };

  const resetTimer = () => {
    setHour(0);
    setMin(0);
    setSec(0);
    setRunning(false);
    setValue(0);
  };

  return (
    <div
      className="App"
      style={{
        width: "700px",
        height: "500px",
        margin: "100px auto",
        backgroundColor: "#0b0b17",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "whitesmoke",
        padding: "20px",
      }}>
      <div style={{ padding: "10px", width: "70%", margin: "0 auto" }}>
        <p style={{ color: "#1989b7", marginBottom: "5px" }}>Enter Minutes</p>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
          style={{
            background: "none",
            color: "white",
            border: "0.5px solid #3a3838",
            padding: "8px",
            borderRadius: "5px",
            width: "100%",
          }}
          placeholder="0"
        />
      </div>
      <div
        style={{
          padding: "10px",
          color: "#1989b7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "25px",
        }}>
        {!running ? (
          <FaPlayCircle
            onClick={() => setRunning(!running)}
            size={35}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FaPauseCircle
            onClick={() => setRunning(!running)}
            size={35}
            style={{ cursor: "pointer" }}
          />
        )}
        &nbsp;&nbsp;
        <span>{hour >= 10 ? hour : "0" + hour}</span>&nbsp;:&nbsp;
        <span>{min >= 10 ? min : "0" + min}</span>&nbsp;:&nbsp;
        <span>{sec >= 10 ? sec : "0" + sec}</span> &nbsp;&nbsp;
        <LuTimerReset
          size={35}
          style={{ cursor: "pointer" }}
          onClick={() => resetTimer()}
        />
      </div>
    </div>
  );
}

export default App;
