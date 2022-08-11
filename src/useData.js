import { useState, useEffect } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson-client";

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const electricityData =
  "https://raw.githubusercontent.com/bdlcm/D3/master/WORLD_ATLAS_2.0%20Electric%20power%20consumption%20(kWh%20per%20capita)%20(1).json";

  const url = "https://raw.githubusercontent.com/alexaac/map-challenges/master/points/data/ne_10m_populated_places_simple.geojson";
export const useData = () => {
  // json(mapData, function(data) { console.log("mapData", data); });
  console.log("electricityData", electricityData);
  const [data, setData] = useState(null);
  const [countryData, setCountrydata] = useState(null);

  useEffect(() => {
    json(url).then((topojsonData) => {
     

       console.log("pop data", topojsonData);
    });
  }, []);

  useEffect(() => {
    json(electricityData).then((topojsonData) => {
      setCountrydata(
        topojsonData.data.filter((country) => country["Year"] === 2014)
      );

      // console.log("countryData", topojsonData.data);
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
  }, []);

  return { data, countryData };
};
