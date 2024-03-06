"use client";

// Todo: https://viblo.asia/p/tao-ban-do-viet-nam-gom-2-quan-dao-truong-sa-va-hoang-sa-voi-react-simple-maps-WAyK87wE5xX

import React from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

// Styles
import './index.local.scss';

const vietnamGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_VNM_0.json";

const paracelIslandGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_XPI_0.json";

const spralyIslandGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_XSP_0.json";

const markers = [
  {
    markerOffset: -30,
    name: "Buenos Aires",
    coordinates: [16, 106]
  },
  { markerOffset: 30, name: "Ha Noi", coordinates: [21.028511, 105.804817] },
  { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 15, name: "Bogota", coordinates: [-74.0721, 4.711] },
  { markerOffset: 15, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: -30, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset: -30, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
  { markerOffset: 15, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
  { markerOffset: 15, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: 15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
  { markerOffset: 15, name: "Lima", coordinates: [-77.0428, -12.0464] }
];

const vietnam = [vietnamGeoUrl, paracelIslandGeoUrl, spralyIslandGeoUrl];
const MapChart = ({ setTooltipContent }) => {
  return (
    <div className="ts-map-vn">
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        projectionConfig={{
          scale: 2000,
          center: [106, 14.5],
        }}
        style={{
          width: "100%",
          height: "auto",
        }}
        width={800}
        height={800}
      >
        <ZoomableGroup center={[0, 0]}>
          {vietnam.map((geoUrl) => (
            <Geographies key={geoUrl} geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME_0 } = geo.properties;
                      // setTooltipContent(NAME_0);
                    }}
                    onMouseLeave={() => {
                      // setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "rgba(1, 22, 39, 0.6)",
                        stroke: "#E5E5E5",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#e6dfd9",
                        stroke: "#212529",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          ))}
          <Marker coordinates={[-21.028511, -105.804817]}>
            <circle r={8} fill="#F53" />
          </Marker>
{/* 
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
                {name}
              </text>
            </Marker>
          ))} */}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
