const connection = new WebSocket("ws://localhost:8080");
const button = document.querySelector("#send");

connection.onopen = (event) => {
  console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
  console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
  console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
  const chat = document.querySelector("#chat");

  if (typeof event.data === "string") {
    // Append text-based messages directly to the chat element
    chat.innerHTML += event.data;
  } else if (event.data instanceof Blob) {
    // Handle blob data using FileReader
    const reader = new FileReader();
    reader.onload = (blobEvent) => {
      const blobData = blobEvent.target.result;
      // Process the blob data as needed
      // Append the processed data to the chat element
      chat.innerHTML += `<p>${blobData}</p>`;
    };
    reader.readAsText(event.data);
  }
};

button.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const message = document.querySelector("#message");
  const data = `<p>${name.value}: ${message.value}</p>`;

  // Send composed message to the server
  connection.send(data);

  // clear input fields
  name.value = "";
  message.value = "";
});
