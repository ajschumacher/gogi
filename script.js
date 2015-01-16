var socket = new WebSocket("ws://localhost:4808/data");
var div = document.getElementById("gog");
socket.onmessage = function(event) {
  div.innerText = event.data;
};
