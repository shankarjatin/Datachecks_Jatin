import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface TimeSeriesChartProps {
  data: { x: string; y: number }[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const options = {
    chart: {
      type: 'line',
      zoom: { enabled: true },
    },
    xaxis: {
      type: 'datetime',
    },
    theme: {
      mode: 'light',
    },
  };

  const series = [{ name: 'Visitors', data }];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Visitors Over Time</h2>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
