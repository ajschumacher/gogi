var svg = d3.select("body").append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

function draw(data) {
  svg.selectAll(".point")
      .data(data)
    .enter().append("circle")
      .attr("class", "point")
      .attr("r", 4)
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

var socket = new WebSocket("ws://localhost:4808/data");
socket.onmessage = function(event) {
  draw(JSON.parse(event.data));
};
