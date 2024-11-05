import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ColumnChartProps {
  data: { country: string; visitors: number }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const options = {
    chart: { type: 'bar' },
    plotOptions: {
      bar: { horizontal: false, dataLabels: { position: 'top' } },
    },
    xaxis: { categories: data.map((item) => item.country) },
    theme: {
      mode: 'light',
    },
  };

  const series = [{ name: 'Visitors', data: data.map((item) => item.visitors) }];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Visitors by Country</h2>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
