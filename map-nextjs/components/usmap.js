"use client";

import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";
import * as d3 from "d3";
import "../app/globals.css";
import svgPanZoom from "svg-pan-zoom";

const USMap = ({ cities }) => {
  const [hoverState, setHoverState] = useState("");
  const [hoverCity, setHoverCity] = useState("");

  var svgRef;
  var panZoomRef;

  svgRef = useRef(null);
  panZoomRef = useRef(null);

  useEffect(() => {
    const svgElement = d3.select(svgRef.current).node();
    const svg = d3.select(svgElement);
    const projection = d3.geoAlbersUsa().scale(1280).translate([480, 300]);
    const path = d3.geoPath().projection(projection);

    const usUrl = "/data/states.json";

    d3.json(usUrl).then((usData) => {
      const states = feature(usData, usData.objects.states).features;

      svg
        .append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(states)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#dbdbdb")
        .on("mouseover", function (d) {
          if (cities.length === 0) {
            d3.select(this).attr("d", path).style("fill", "gray");
            setHoverState(d.path[0].__data__.properties.name);
          }
        })
        .on("mouseout", function (d) {
          if (cities.length === 0) {
            d3.select(this).attr("d", path).style("fill", "#dbdbdb");
            setHoverState("");
          }
        });

      svg
        .append("g")
        .selectAll("circle")
        .data(cities)
        .enter()
        .append("circle")
        .attr("cx", (d) => projection(d.coordinates)[0])
        .attr("cy", (d) => projection(d.coordinates)[1])
        .attr("r", 4)
        .attr("fill", "blue")
        .on("mouseenter", handleCityHover)
        .on("mouseleave", handleCityLeave);

      function handleCityHover(city) {
        setHoverCity(city.path[0].__data__.name);
      }

      function handleCityLeave() {
        setHoverCity("");
      }

      panZoomRef.current = svgPanZoom("#bello", {
        panEnabled: true,
        controlIconsEnabled: false,
        zoomEnabled: true,
        dblClickZoomEnabled: true,
        mouseWheelZoomEnabled: true,
        preventMouseEventsDefault: true,
        fit: true,
        center: true,
      });
      panZoomRef.current.zoom(0.9);
    });
  }, [cities]);

  return (
    <>
      <center>
        <div className="mt-8" style={{ width: "100%", height: "600px" }}>
          <svg
            id="bello"
            width="80%"
            height="100%"
            style={{ border: "1px solid #ccc" }}
            preserveAspectRatio="none"
          >
            <svg ref={svgRef} className="renderingSvg" id="mapId">
              {/* The map will be rendered inside this SVG element */}
            </svg>
          </svg>
        </div>
        <br />
        <div>{hoverState}</div>
        <div>{hoverCity}</div>
      </center>
    </>
  );
};

export default USMap;
