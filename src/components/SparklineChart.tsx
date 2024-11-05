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
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 600,
      },
      background: '#ffffff',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#007bff'],
    },
    tooltip: {
      theme: 'light',
    },
    markers: {
      size: 4,
      colors: ['#007bff'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    theme: {
      mode: 'light',
    },
    title: {
      text: `${title}: ${total}`,
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    fill: {
      opacity: 0.3,
      colors: ['#007bff'],
    },
  };

  const series = [{ name: title, data }];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 mb-5 transition-all hover:shadow-2xl">
      <h4 className="text-gray-700 font-semibold text-lg mb-3">{title}</h4>
      <ReactApexChart options={options} series={series} type="line" height={120} />
      <div className="text-right mt-2 text-gray-800 font-medium text-sm">
        Total: <span className="font-bold text-blue-600">{total}</span>
      </div>
    </div>
  );
};

export default SparklineChart;
