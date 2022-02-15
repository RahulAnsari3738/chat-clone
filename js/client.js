const socket = io("http://localhost:8000");

const form = document.getElementById("send-containers");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

// socket.on("connect", () => {
//   console.log(socket.id);
// });

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};
var name = prompt("Please enter your name");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "left");
});

socket.on("receive", (data) => {
  append(`${data.name} :${data.message}`, "left");
});
