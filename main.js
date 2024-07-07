import { createRoom, requireAuth } from "./script/firebase";
import "./style.css";

function setupEventListener() {
  const btn = document.getElementById("create-room-btn");
  btn.addEventListener("click", async () => {
    const roomId = await createRoom(); //建立房間
    window.location.href = `room.html?roomId=${roomId}`;
  });
}

requireAuth().then(setupEventListener);
