import * as d3 from 'd3';
import { geoOrthographic, geoPath, scaleLinear, geoGraticule} from "d3";

 
import React, { useState, useEffect } from 'react';

 



export const Globe = ({data: { land, geometry } }) => {
 

 


  useEffect(() => {

    renderD3Globe();
 
 
  }, []);

  const renderD3Globe = () =>{
    const width = 400, height = 400;

    const projection = geoOrthographic()
        .scale(200)
        .translate([width / 2, height / 2])
        .clipAngle(90);
    
        const path = geoPath(projection);
    
        const graticule =  geoGraticule();

        const λ = scaleLinear()
        .domain([0, width])
        .range([-180, 180]);
    
        const φ =  scaleLinear()
        .domain([0, height])
        .range([90, -90]);
    
        const svg = d3.select("#sphere").append("svg")
        .attr("width", width)
        .attr("height", height);


            
      svg.append("path")
      .datum(land)
      .attr("class", "land")
      .attr("d", path);
      
      svg.append("path")
       .attr("class", "graticule")
      .attr("d", path(graticule()));

      svg.append("path")
      .datum(geometry)
      .attr("class", "interiors")
      .attr("d", geometry);
      


const scrollSpeed = 50; 

let current = 0;
    function bgscroll(){
current += 1;
projection.rotate([λ(current), 0]);
   svg.selectAll("path").attr("d", path);


}


     setInterval(bgscroll, scrollSpeed);  
  }

 
 
 
 

  return (

   <g className='marks'>
<div id="sphere"></div>
   </g>

   );
};
