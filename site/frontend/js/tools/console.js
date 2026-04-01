const sock_url = "ws" + window.ENV.API_URL.slice(4);
let console_window = document.createElement("div");
let socket = null;

function setup_rcon() {
  if (socket) socket.close();
  socket = new WebSocket(`${sock_url}/rcon`);

  socket.onopen = (e) => {
    console.log("Соединение установлено");
    console_window = document.getElementById("console-window");
  };

  socket.onmessage = (event) => {
    let line = document.createElement("p");
    line.textContent = event.data;
    console_window.appendChild(line);
    console_window.scrollTop = console_window.scrollHeight;
  };
}