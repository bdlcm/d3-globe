import * as d3 from "d3";
import { geoOrthographic, geoPath, scaleLinear, geoGraticule } from "d3";

import React, { useState, useEffect } from "react";

export const Globe = ({ data: { land, geometry }, countryData }) => {
  useEffect(() => {
    renderD3Globe();
  }, []);

  const renderD3Globe = () => {
    const width = 400,
      height = 400;

    const projection = geoOrthographic()
      .scale(200)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = geoPath(projection);

    const graticule = geoGraticule();

    const λ = scaleLinear().domain([0, width]).range([-180, 180]);

    const φ = scaleLinear().domain([0, height]).range([90, -90]);

    const scrollSpeed = 50;

    let current = 0;

    const svg = d3
      .select("#globe")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    //adds a gradient for styling use
    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "svgGradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", "#05f4a0")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "#323162")
      .attr("stop-opacity", 1);

    //end of gradient

    svg.append("circle").attr("class", "sphere").style("fill", "none");

    svg
      .append("path")
      .datum(land)
      .attr("class", "land")
      .attr("d", path)
       
    

    svg.append("path").attr("class", "graticule").attr("d", path(graticule()));

    svg
      .append("path")
      .datum(geometry)
      .attr("class", "interiors")
      .style("fill", "url(#svgGradient)")

      .attr("d", path(geometry))
    svg
      .append("g")
      .datum(geometry)
      .attr("class", "interiors")
      .attr("d", path(geometry));

 
    function bgscroll() {
      current += 5;
      projection.rotate([-λ(current), -24]);
      svg.selectAll("path").attr("d", path);

      drawCircles();
    }

    function drawCircles() {
      var circles = svg.selectAll("circle").data(geometry.features);
      circles
        .enter()
        .append("circle")
        .merge(circles)
 
         .style("opacity", 0.5)
        .style("fill", "#00ffa6")
        // .attr("stroke", "#028457")
    
         .attr("cx", function (d) {

          if (path.centroid(d)[0])
         { return path.centroid(d)[0]};
        })
        .attr("cy", function (d) {
          if (path.centroid(d)[0])
          {return path.centroid(d)[1]};
        })
        .attr("r", function (d) {
          const result = countryData.filter(
            (country) => country["United Nations m49 country code"] === d.id
          );
        
          if (result.length != 0)
        { 
          if (
            result[0]["Electric power consumption (kWh per capita)"] >= 20000
          ) {
            return 30;
          }  
          
          if (
              result[0]["Electric power consumption (kWh per capita)"] >= 10000
            ) {
              return 20;
            }

            if (
              result[0]["Electric power consumption (kWh per capita)"] >= 5000
            ) {
              return 10;
            }
          if (
            result[0]["Electric power consumption (kWh per capita)"] >= 1000
          ) {
            return 5;
          }
          if (result[0]["Electric power consumption (kWh per capita)"] >= 500) {
            return 2.5;
          } 

          if (result[0]["Electric power consumption (kWh per capita)"] >= 200) {
            return 1;
          }
        
        
        }
          
          else {
            return 0.5;
          }
        // return 5
         });

      circles.exit().remove();
    }

    setInterval(bgscroll, scrollSpeed);
  };

  return (
    <div className="marks">
      <div id="globe"></div>
    </div>
  );
};
