import {
  requireAuth,
  sendMessageToRoom,
  subscribeToRoom,
} from "./scripts/firebase";
import "./style.css";

function appendMessage(message) {
  const messageContainer = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  const user = document.createElement("div");
  user.innerText = message.senderName;
  const messageText = document.createElement("div");
  if (message.isSelf) {
    user.classList.add("message__user--self");
    messageText.classList.add("message__text--self");
  } else {
    user.classList.add("message__user");
    messageText.classList.add("message__text");
  }
  messageText.innerText = message.content;
  messageElement.appendChild(user);
  messageElement.appendChild(messageText);
  messageContainer.appendChild(messageElement);
}

function sendMessage(roomId) {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  if (message === "") return;

  sendMessageToRoom(roomId, message);
  messageInput.value = "";
}

function goToBottom() {
  const messages = document.getElementById("messages");
  messages.scrollTop = messages.scrollHeight - messages.clientHeight;
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
const messageIds = new Set();
function messageUpdateHandler(messages) {
  messages.forEach((message) => {
    if (!messageIds.has(message.id)) {
      messageIds.add(message.id);
      appendMessage(message);
    }
  });
  goToBottom();
}

requireAuth().then((user) => {
  const roomId = new URLSearchParams(window.location.search).get("roomId");
  setupEventListeners(roomId);
  subscribeToRoom(messageUpdateHandler, roomId);
});
