import * as d3 from "d3";
import { scaleLinear } from "d3";

import React, { useEffect, useRef } from "react";

export const Globe = ({ data: { land, geometry }, countryData }) => {
  const svgRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    renderD3Globe();
    renderLegend();
  }, []);

  const countryDataArray = Object.entries(countryData);

  const width = 400;
  const height = 400;
  const projection = d3
    .geoOrthographic()
    .scale(200)
    .translate([width / 2, height / 2])
    .clipAngle(90);

  const path = d3.geoPath().projection(projection);

  const renderLegend = () => {
    const minValue = Math.min(
      ...countryDataArray.map(
        ([code, data]) => data["Electric power consumption (kWh per capita)"]
      )
    );
    const maxValue = Math.max(
      ...countryDataArray.map(
        ([code, data]) => data["Electric power consumption (kWh per capita)"]
      )
    );

    // Legend variables
    const legendHeight = 20;
    const legendWidth = 300;

    const background = d3.select(legendRef.current).append("svg");

    // Legend container
    const legend = background.append("g").attr("id", "legend");

    // Legend gradient
    const gradient = legend
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%")
      .attr("spreadMethod", "pad");

    // Legend gradient color stops
    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "hsl(150,100%,20%)");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "hsl(150,100%,100%)");

    // Legend rectangle
    legend
      .append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#legend-gradient)");

    // Legend scale
    const legendScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([0, legendWidth]);

    // Legend axis
    const legendAxis = d3
      .axisBottom(legendScale)
      .ticks(4)
      .tickFormat((d) => d + " kWh");

    legend
      .append("g")
      .attr("transform", `translate(0, ${legendHeight})`)
      .call(legendAxis)
      .selectAll("text")
      .style("fill", "white"); // Change the color of the text to white
  };

  const renderD3Globe = () => {
    const λ = scaleLinear().domain([0, width]).range([-180, 180]);

    let rafId = null;

    const graticule = d3.geoGraticule();

    const scrollSpeed = 50;
    let current = 0;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.append("circle").attr("class", "sphere").style("fill", "none");

    svg.append("path").datum(land).attr("class", "land").attr("d", path);

    svg.append("path").attr("class", "graticule").attr("d", path(graticule()));

    countryDataArray.forEach(([code, data]) => {
      svg
        .append("path")
        .datum(
          geometry.features.find(
            (f) => f.id === data["United Nations m49 country code"]
          )
        )
        .attr("class", "interiors")
        .style("fill", function () {
          let country = data["Electric power consumption (kWh per capita)"];
          let brightness = 20 + (country % 100) * (80 / 100);
          return "hsl(150,100%," + brightness + "%)";
        })
        .style("filter", function () {
          let country = data["Electric power consumption (kWh per capita)"];
          let spread = 2 + (country % 1000) * (10 / 1000);
          return "drop-shadow(0px 0px " + spread + "px hsl(60,100%,98%))";
        })
        .attr("d", path);
    });

    function animate() {
      current = (current + scrollSpeed / 10) % 360;
      projection.rotate([-λ(current), -24]);
      svg.selectAll("path").attr("d", path);

      rafId = requestAnimationFrame(animate);
    }

    // Stop the animation after 10 seconds
    //setTimeout(stopAnimate, 10000);
    animate();
    // ()
  };

  return (
    <div className="marks">
      <div id="legend-background" ref={legendRef}></div>
      <div id="globe" ref={svgRef}></div>
    </div>
  );
};

