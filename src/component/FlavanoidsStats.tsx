import React from "react";
import { Paper, Table } from "@mantine/core";
import { wineData } from "../WineData";
import { calculateMean, calculateMedian, calculateMode, dataSet } from "../utility/helperFunction";

const measure = ["Flavonoids Mean", "Flavonoids Median", "Flavonoids Mode"];


export const FlavanoidsStats: React.FC = () => {

  // Group data by Alcohol class
  const groupedData: { [key: number]: number[] } = {};
  wineData.forEach(({ Alcohol, Flavanoids }) => {
    if (!groupedData[Alcohol]) {
      groupedData[Alcohol] = [];
    }
    groupedData[Alcohol].push(Number(Flavanoids));
  });

  // Calculate mean, median, and mode for each class
  const stats = Object.keys(groupedData).map((alcoholClass) => {
    const flavanoidsData = groupedData[parseFloat(alcoholClass)];
    const mean = calculateMean(flavanoidsData);
    const median = calculateMedian(flavanoidsData);
    const mode = calculateMode(flavanoidsData);

    return { alcoholClass, mean, median, mode };
  });

  // get the data in structure format as per the table
  let output: any = dataSet(stats);
  

  return (
    <Paper shadow="md" style={{ maxWidth: 800, margin: "auto" }}>
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>
        {" "}
        Flavanoids Statistics
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
