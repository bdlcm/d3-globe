import { geoOrthographic, geoPath, geoGraticule, append } from "d3";
import React, { useState, useCallback, useEffect } from "react";
import $, { data } from "jquery";

export const Marks = ({ data: { land, geometry } }) => {
  const width = 500;
  const height = 500;
  const intialMousePosition = { x: width / 2, y: height / 2 };
  const rotate = [0, -23.5];
  const velocity = [0.015, -0];
  const [dt, setDT] = useState(Date.now());

  const projection = geoOrthographic()
    .scale(300)
    .rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
  const path = geoPath(projection);
  const graticule = geoGraticule();

  const time = Date.now();

  // const [now, setNow] = useState(Date.now())

  const [MousePosition, SetMousePosition] = useState(intialMousePosition);
  const [mouseDown, SetMousedDown] = useState(false);

  const handleMouseDown = useCallback((event) => {
    SetMousedDown(true);
  }, []);

  const handleMouseUp = useCallback((event) => {
    $(".marks").css("cursor", "");
    SetMousedDown(false);
  }, []);

  const handleClick = useCallback((event) => {
    console.log(event);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      if (mouseDown) {
        SetMousePosition({ x: clientX, y: clientY });
        $(".marks").css("cursor", "pointer");
        $(".star").css("backgroundPositionX", clientX);
        $(".star").css("backgroundPositionY", clientY);
      }
    },
    [SetMousePosition, mouseDown]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDT(Date.now() - time);
    }, 200);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <g
      className="marks"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {projection}
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

          {path.centroid(feature)[0] ?? (
            <circle
              className="interiors"
              key={i}
              cx={path.centroid(feature)[0]}
              cy={path.centroid(feature)[1]}
              r="2"
              fill="red"
              fontSize="36"
            ></circle>
          )}
        </g>
      ))}
    </g>
  );
};
