import { geoOrthographic, geoPath, geoGraticule, timer} from "d3";
import React, { useState, useMemo, useEffect, useRef } from "react";
import $, { data } from "jquery";
import { Counter } from "./hooks/animation";

export const Marks = ({ data: { land, geometry } }) => {

 
  const width = 500;
  const height = 500;
  // const intialMousePosition = { x: width / 2, y: height / 2 };
  const rotate = [0, -23.5];
  const velocity = [0.015, -0];
  // const [dt, setDT] = useState(Date.now());

 
  const [rotation, setRotation] = useState(0);


 
  const savedCallback = useRef();

  const count=Counter();

  const projection = useMemo(() => {

   return geoOrthographic()
    .scale(300);
  }, []);

  const path   = useMemo(() => {

    return geoPath(projection);
   }, [projection]);
 
  const graticule = useMemo(() => {

    return geoGraticule();

  }, []);
  // function useInterval(callback, delay) {

  //   useEffect(() => {
  //     savedCallback.current = callback;
  //   }, [callback]);
    
  //   // Set up the interval.
  //   useEffect(() => {
  //     let id = setInterval(() => {
  //       savedCallback.current();
  //     }, delay);
  //     return () => clearInterval(id);
  //   }, [delay]);
    
  // };




 
 

 
  // useInterval(() => {
  //   setRotation(rotation + 0.2);
  //   console.log("interval", rotation)
  // }, 200);

 


  // const useAnimationFrame = callback => {
  //   // Use useRef for mutable variables that we want to persist
  //   // without triggering a re-render on their change
  //   const requestRef = useRef();
  //   const previousTimeRef =  useRef();
    
  //   const animate = time => {
  //     if (previousTimeRef.current != undefined) {
  //       const deltaTime = time - previousTimeRef.current;
  //       callback(deltaTime)
  //     }
  //     previousTimeRef.current = time;
  //     requestRef.current = requestAnimationFrame(animate);
  //   }
    
  //  useEffect(() => {
  //     requestRef.current = requestAnimationFrame(animate);
  //     return () => cancelAnimationFrame(requestRef.current);
  //   }, []); // Make sure the effect runs only once
  // }
  
  //   const Counter = () => {
  //   const [count, setCount] = React.useState(0)
    
  //   useAnimationFrame(deltaTime => {
  //     // Pass on a function to the setter of the state
  //     // to make sure we always have the latest state
  //     setCount(prevCount => (prevCount + deltaTime * 0.01) % 100)
  //   })
      
  //  console.log("count", count);
  // }
  

  return (

    <g
      className="marks"
 
    >
      {projection.rotate([count, -24])}
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path
        className="graticule"
        d={path(graticule())}
        style={{ display: "none" }}
      />

      {land.features.map((feature, i) => (
        <path className="feature" d={path(feature)} key={i} />
      ))}

      {geometry.features.map((feature, i) => (
        <g>
          <path
            className="interiors"
            d={path(feature)}
            key={feature.properties.name}
            id={feature.properties.name}
          >
            {/* <div     cx={path.centroid(feature)[0]} cy={path.centroid(feature)[1]}   fontSize="36">{feature.properties.name}</div> */}
          </path>

          {/* {path.centroid(feature)[0] ?? (
            <circle
              className="interiors"
              key={i}
              cx={path.centroid(feature)[0]}
              cy={path.centroid(feature)[1]}
              r="2"
              fill="red"
              fontSize="36"
            ></circle>
          )} */}
        </g>
      ))}
    </g>
  );
};
