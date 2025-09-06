import { useEffect, useState } from "react";
import client from "./api/client";
import Home from "./Pages/home/index";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    client.get("/hello").then(res => {
      setMsg(res.data.message);
    });
  }, []);

  return (
    <div>
      <h1>React + Spring Boot</h1>
      <p>Backend trả về: {msg}</p>
      <Home></Home>
    </div>
  );
}

export default App;
