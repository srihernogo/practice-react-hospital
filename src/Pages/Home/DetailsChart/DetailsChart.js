import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

const DetailsChart = () => {
  const data = [
    { name: 'Doctors', uv: 128, pv: 2400, amt: 2400 },
    { name: 'Patients', uv: 368, pv: 2400, amt: 2400 },
    { name: 'Stuffs', uv: 270, pv: 2400, amt: 2400 },
    { name: 'Beds', uv: 142, pv: 2400, amt: 2400 },
    { name: 'Ambulence', uv: 120, pv: 2400, amt: 2400 },
  ];
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: '#f5f5f5',
            border: '1px solid #d5d5d5',
            borderRadius: 3,
            lineHeight: '40px',
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
        <Bar dataKey="uv" fill="#8884d8" barSize={30} />
      </BarChart>
    </div>
  );
};

export default DetailsChart;
