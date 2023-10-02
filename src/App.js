import "./styles.css";
import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

export default function App() {
  const [mouseUp, setMouseUp] = useState(false);
  const [activeDragIcon, setActiveDragIcon] = useState("");
  const [cord, setCord] = useState([
    {
      subject: "Math",
      A: 10
    },
    {
      subject: "Chinese",
      A: 30
    },
    {
      subject: "English",
      A: 50
    },
    {
      subject: "Geography",
      A: 70
    },
    {
      subject: "Physics",
      A: 40
    },
    {
      subject: "History",
      A: 90
    }
  ]);

  const Coords = (e) => {
    const radiusInPer = (75 * 100) / e?.activeCoordinate?.outerRadius;
    const radiusData = (radiusInPer * e?.activeCoordinate?.radius) / 75;
    setCord(
      cord.map((el) =>
        el.subject === e?.activeLabel ? { ...el, A: radiusData } : el
      )
    );
  };

  return (
    <RadarChart
      outerRadius="75%"
      width={500}
      height={500}
      data={cord}
      onMouseUp={() => {
        setMouseUp(false);
        setActiveDragIcon("");
      }}
      onMouseDown={(e) => {
        setMouseUp(true);
        setActiveDragIcon(e?.activeLabel);
      }}
      onMouseMove={(e) => {
        mouseUp && activeDragIcon === e?.activeLabel && Coords(e);
      }}
    >
      <PolarGrid gridType="circle" />
      <PolarAngleAxis
        dataKey="subject"
        orientation="outer"
        axisLineType="circle"
        tick={true}
      />
      <PolarRadiusAxis domain={[0, 100]} />
      <Radar
        dot={true}
        dataKey="A"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.6}
        isAnimationActive={false}
      />
    </RadarChart>
  );
}
