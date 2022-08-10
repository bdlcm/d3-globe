import React, { useState, useEffect } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson-client";
import mapData from "./mapData.json";
const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

const otherUrl =
  "https://gist.githubusercontent.com/ArvinH/cec17ab68a8173e29706192da30584ca/raw/1b265e9ec3bf24fa602016bcd82d0e4ac62add80/geonames_cities_100k.geojson";

export const useData = () => {
  // json(mapData, function(data) { console.log("mapData", data); });
  console.log(mapData);
  const [data, setData] = useState(null);
  const [popData, setPopData] = useState(null);

  useEffect(() => {
    json(otherUrl).then((topojsonData) => {
      console.log("popdata", topojsonData);

      //  const {countries,land} = topojsonData.objects;

      setPopData({
        pop: feature(topojsonData, topojsonData.features),
      });
    });
  }, []);

  useEffect(() => {
    json(jsonUrl).then((topojsonData) => {
      const { countries, land } = topojsonData.objects;

      setData({
        land: feature(topojsonData, land),
        interiors: mesh(topojsonData, countries, (a, b) => a !== b),
        geometry: feature(topojsonData, topojsonData.objects.countries),
      });
    });

    console.log("rendered");
  }, []);

  console.log("altered data", data);

  return data;
};
