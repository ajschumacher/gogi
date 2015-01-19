var svg = d3.select("body").append("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight);

function draw(data) {
  var points = svg.selectAll(".point").data(data);
  points.transition()
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
  points.enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 0)
    .transition()
    .attr("r", 4);
  points.exit()
    .transition()
    .attr("r", 0)
    .remove();
}

var socket = new WebSocket("ws://localhost:4808/data");
socket.onmessage = function(event) {
  draw(JSON.parse(event.data));
};
