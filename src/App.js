import React, { useState } from "react";
import axios from "axios";
import './App.css';

export default function App() {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());
  const [time, setTime] = useState('');
  const [utc, setUTC] = useState('');
  const [result, setResult] = useState('')

  setInterval(update, 1000);

  function update() {
    setClock(new Date().toLocaleTimeString());
  }

  function handleChangeTime(event) {
    setTime(event.target.value);
  }

  function handleChangeUTC(event) {
    setUTC(event.target.value);
  }

  function handleKeyPress(event) {
    axios
      .post("http://localhost:3000/api/v1/timezone", {time: time, timezone: utc})
      .then((res) => {
        console.log(res);
        setResult(res.data.response.time)
      })
      .catch((error) => {
        console.log("Errorrr", error);
      });
  }

  return (
    <div>
      <div className="clock">
        <h1>{clock}</h1>
      </div>
      <div className="forms">
        <label>Hora (HH:MM:SS)</label>
        <input
          onChange={handleChangeTime}
          type="text"
        />
        <br/><br/>
      
        <label>UTC (ejemplo: -4)</label>
        <input
          onChange={handleChangeUTC}
          type="text"
        />
        <br/>

        <button
          onClick={handleKeyPress}>
          <span>Calcular</span>
        </button>

        <h1>Resultado {result}</h1>
      </div>
    </div>
  );
}
