import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const data01 = [
  { name: 'Group A', value: 400, fill: '#57c0e8'},
  { name: 'Group B', value: 300, fill: "#FF6565" },
  { name: 'Group C', value: 300, fill: "#FFDA83" },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100, fill: "#FFDA83" },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];


// const testMeasurments = [
//   {
//     data: [
//       {name: "glucose", value: 6, },
//       {name: "SpO2", value: 5, fill: "#FF6565"},
//       {name: "Blood Pressure", value: 4, fill: "#FFDA83"},
//       {name: "Body Weight", value: 2, fill: "purple"}
//     ]
//   }
// ]

const Chart_MostDownloadedIndustry = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={400} height={400}>
        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={90} fill="#007BFF" />
        <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={100} outerRadius={120} fill="#000" label />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart_MostDownloadedIndustry;