import React from "react";
import { Paper, Table } from "@mantine/core";
import { calculateMean, calculateMedian, calculateMode, dataSet } from "../utility/helperFunction";

export interface WineDataPoint {
  "Alcohol": number;
  "Malic Acid": number;
  "Ash": string|number;
  "Alcalinity of ash": number;
  "Magnesium": number;
  "Total phenols": number;
  "Flavanoids": string|number;
  "Nonflavanoid phenols": string|number;
  "Proanthocyanins": string|number;
  "Color intensity": string|number;
  "Hue": number;
  "OD280/OD315 of diluted wines": string|number;
  "Unknown": number;
}

export interface GammaStatsProps {
  data: WineDataPoint[];
}

const measure = ["Gamma Mean", "Gamma Median", "Gamma Mode"];

const calculateGamma = (dataPoint: WineDataPoint): number => {
  return (Number(dataPoint.Ash) * dataPoint.Hue) / dataPoint.Magnesium;
};


const calculateClassWiseGammaStats = (
  data: WineDataPoint[]
): { alcoholClass: number; mean: number; median: number; mode: number }[] => {
  const classWiseData: Record<number, number[]> = {};
  data.forEach((point) => {
    const gamma = calculateGamma(point);
    if (!classWiseData[point.Alcohol]) {
      classWiseData[point.Alcohol] = [];
    }
    classWiseData[point.Alcohol].push(gamma);
  });

  return Object.keys(classWiseData).map((alcoholClass) => {
    const gammaData = classWiseData[parseInt(alcoholClass, 10)];
    const mean = calculateMean(gammaData);
    const median = calculateMedian(gammaData);
    const mode = calculateMode(gammaData);

    return { alcoholClass: parseInt(alcoholClass, 10), mean, median, mode };
  });
};

const GammaStats: React.FC<GammaStatsProps> = ({ data }) => {
 
  let stats = calculateClassWiseGammaStats(data);
  
  // get the data in structure format as per the table
  let output: any = dataSet(stats);

 
  return (
    <Paper shadow="md" style={{ maxWidth: 800, margin: "auto" }}>
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>
        Gamma Statistics
      </h2>
      <Table striped style={{ border: "1px solid #ccc", borderRadius: 8 }}>
        <thead>
          <Table.Tr style={{ background: "#f0f0f0" }}>
            <Table.Th
              style={{ border: "1px solid #ccc", padding: "10px 20px" }}
            >
              Measure
            </Table.Th>
            {stats.map(({ alcoholClass }) => (
              <Table.Th
                key={alcoholClass}
                style={{ border: "1px solid #ccc", padding: "10px 20px" }}
              >{`Class ${alcoholClass}`}</Table.Th>
            ))}
          </Table.Tr>
        </thead>
        <tbody>
          {output.map((ele: any, key: any) => (
            <Table.Tr
              key={key}
              style={{
                background: Number(key) % 2 === 0 ? "#f9f9f9" : "transparent",
              }}
            >
              <Table.Td
                style={{ border: "1px solid #ccc", padding: "10px 20px" }}
              >
                {measure[Number(key)]}
              </Table.Td>
              <Table.Td
                style={{ border: "1px solid #ccc", padding: "10px 20px" }}
              >
                {ele[0].toFixed(3)}
              </Table.Td>
              <Table.Td
                style={{ border: "1px solid #ccc", padding: "10px 20px" }}
              >
                {ele[1].toFixed(3)}
              </Table.Td>
              <Table.Td
                style={{ border: "1px solid #ccc", padding: "10px 20px" }}
              >
                {ele[2].toFixed(3)}
              </Table.Td>
            </Table.Tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default GammaStats;
