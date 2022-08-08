import { geoOrthographic, geoPath, geoGraticule, append } from 'd3';
import React, {useState, useCallback, useEffect} from 'react';
import $ from 'jquery';

const width = 500;
const height = 500;
const intialMousePosition = {x: width/2, y: height/2};

const projection = geoOrthographic();
const path = geoPath(projection);
const graticule = geoGraticule();


export const Marks = ({data: {land, geometry}}) => {

  const [MousePosition, SetMousePosition] = useState(intialMousePosition)
  const [mouseDown, SetMousedDown] = useState(false)

  const handleMouseDown = useCallback((event) => {

  SetMousedDown(true);
  
},[])


const handleMouseUp = useCallback((event) => {

  $('.marks').css('cursor', '')
  SetMousedDown(false);
  
},[])

const handleMouseMove = useCallback((event) => {
  
  const {clientX, clientY}= event;
  if(mouseDown){
    SetMousePosition({x:clientX, y:clientY});
    $('.marks').css('cursor', 'pointer')
    $('.star').css('backgroundPositionX', clientX);
    $('.star').css('backgroundPositionY', clientY);
  }
  
},[SetMousePosition, mouseDown])

useEffect(() => {
  // Update the document title using the browser API
  geometry.features.forEach(feature => {

    console.log(feature.properties.name, );
  });
 
},[]);



  
  return(
  <g  className="marks" onMouseDown = {handleMouseDown} onMouseMove = {handleMouseMove} onMouseUp= {handleMouseUp}>
      {projection.rotate([MousePosition.x + 30 / 60, -MousePosition.y, 0])}
     <path className = "sphere" d={ path({type: 'Sphere'})}/>
      <path className = "graticule" d={ path(graticule())} style = {{display: 'none'}}/> 
     
    {
      land.features.map((feature, i) => (
       <path className = "feature" d={ path(feature)} key={i}/>
      )) 
    }

{
      geometry.features.map((feature, i) => (
       <path className = "interiors" d={ path(feature)} key={i}>
        <text >{feature.properties.name}</text> 
       </path>
   
      )) 
    }
 
 

       
  
  
  </g>);
};
