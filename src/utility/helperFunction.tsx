export const dataSet=(stats:any):any=>{
    let output: any = [{}, {}, {}];
    stats.forEach((e: any) => {
    let valuess = e.alcoholClass - 1;
    output[0][valuess] = e.mean;
    output[1][valuess] = e.median;
    output[2][valuess] = e.mode;
  })
  return output
}

export const calculateMean = (data: number[]): number => {
  const sum = data.reduce((acc, curr) => acc + curr, 0);
  return sum / data.length;
};

export const calculateMedian = (data: number[]): number => {
  const sortedData = [...data].sort((a, b) => a - b);
  const middle = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    return (sortedData[middle - 1] + sortedData[middle]) / 2;
  } else {
    return sortedData[middle];
  }
};

export const calculateMode = (data: number[]): number => {
  const counts: { [key: number]: number } = {};
  data.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });
  const mode = Object.keys(counts).reduce((a, b) =>
    counts[parseFloat(a)] > counts[parseFloat(b)] ? a : b
  );
  return parseFloat(mode);
};