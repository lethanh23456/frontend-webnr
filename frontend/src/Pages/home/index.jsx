import { useEffect, useState } from "react";
import client from "../../api/client";

function Home() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.get("/hello");
        setMsg(res.data.message); 
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dữ liệu từ backend:</h1>
      <p>{msg}</p>
    </div>
  );
}

export default Home;
