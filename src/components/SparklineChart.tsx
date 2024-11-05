import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface SparklineChartProps {
  title: string;
  total: number;
  data: number[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ title, total, data }) => {
  const options = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
    },
    theme: {
      mode: 'light',
    },
    title: {
      text: `${title}: ${total}`,
      align: 'center',
      style: { fontSize: '14px' },
    },
  };

  const series = [{ name: title, data }];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <ReactApexChart options={options} series={series} type="line" height={100} />
    </div>
  );
};

export default SparklineChart;
