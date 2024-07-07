import { requireAuth, sendMessageToRoom } from "./scripts/firebase";
import "./style.css";

function sendMessage(roomId) {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  if (message === "") return;

  sendMessageToRoom(roomId, message);
  messageInput.value = "";
}

function addSendMessageListener(roomId) {
  const sendMessageButton = document.getElementById("send-message");
  sendMessageButton.addEventListener("click", () => {
    sendMessage(roomId);
  });

  const input = document.getElementById("message-input");
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendMessageButton.click();
    }
  });
}

function setupEventListeners(roomId) {
  addSendMessageListener(roomId);
}

requireAuth().then((user) => {
  const roomId = new URLSearchParams(window.location.search).get("roomId");
  setupEventListeners(roomId);
});
