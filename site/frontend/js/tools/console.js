const sock_url = "ws" + window.ENV.API_URL.slice(4);
let console_window = document.createElement("div");
let command_input = document.createElement("input");
let socket = null;

function setup_console() {
  setup_sock();
  setup_rcon();
}

function setup_sock() {
  if (socket) socket.close();
  socket = new WebSocket(`${sock_url}/rcon/stream`);

  socket.onopen = (e) => {
    console.log("Соединение установлено");
    console_window = document.getElementById("console-window");
  };

  socket.onmessage = (event) => {
    if (!event.data.includes("Thread RCON Client")) {
      add_message(event.data);
    }
  };
}

function add_message(message) {
  let line = document.createElement("p");
  line.textContent = message;
  console_window.appendChild(line);
  console_window.scrollTop = console_window.scrollHeight;
}

function setup_rcon() {
  command_input = document.getElementById("command-line");
  command_input.addEventListener('change', () => {
    const command = command_input.value;
    if (command) send_command(command);
    command_input.value = '';
    command_input.blur();
  });
}

async function send_command(mc_command) {
  add_message(`>>> ${mc_command}`);
  let result = await fetch(
    `${window.ENV.API_URL}/rcon/execute`,
    {
      method: 'POST',
      body: JSON.stringify({
        command: mc_command,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
  log = await result.json();
  for (let line of log.answer.split("\n")) {
    add_message(line);
  }
}