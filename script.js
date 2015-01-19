var w = window.innerWidth,
    h = window.innerHeight,
    x_scale = d3.scale.linear().range([0, w]),
    // SVG indexes the screen like a matrix
    y_scale = d3.scale.linear().range([h, 0]),
    x_val = function(d) { return d.x; },
    y_val = function(d) { return d.y; },
    x_pos = function(d) { return x_scale(x_val(d)); },
    y_pos = function(d) { return y_scale(y_val(d)); },
    svg = d3.select("body").append("svg")
      .attr("width", w)
      .attr("height", h);

function draw(data) {
  matchScaleToData(x_scale, x_val);
  matchScaleToData(y_scale, y_val);

  var points = svg.selectAll(".point").data(data);
  points.selectAll("title").remove();
  points.append("title")
    .text(function(d) { return JSON.stringify(d, null, 2); });
  points.transition()
    .attr("cx", x_pos)
    .attr("cy", y_pos);

  var new_circles = points.enter().append("circle");
  new_circles.attr("class", "point")
    .attr("cx", x_pos)
    .attr("cy", y_pos)
    .attr("r", 0)
    .transition()
    .attr("r", 4);
  new_circles.append("title")
    .text(function(d) { return JSON.stringify(d, null, 2); });

  points.exit()
    .transition()
    .attr("r", 0)
    .remove();

  function matchScaleToData(scale, fieldFunction) {
    var minimum = d3.min(data, fieldFunction),
        maximum = d3.max(data, fieldFunction);
    scale.domain([minimum, maximum]);
  }
}


var socket = new WebSocket("ws://localhost:4808/data");
socket.onmessage = function(event) {
  draw(JSON.parse(event.data));
};
