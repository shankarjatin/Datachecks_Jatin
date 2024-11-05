import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ColumnChartProps {
  data: { country: string; visitors: number }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
      background: '#f9f9f9',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
        borderRadius: 6,
      },
    },
    xaxis: {
      categories: data.map((item) => item.country),
      labels: {
        style: {
          colors: '#333',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
    },
    theme: {
      mode: 'light',
      palette: 'palette1',
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#333'],
        fontWeight: 'bold',
      },
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 4,
    },
    colors: ['#1f78b4'],
    title: {
      text: 'Visitor Statistics',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const series = [{ name: 'Visitors', data: data.map((item) => item.visitors) }];

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg p-6 mb-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Visitors by Country
      </h2>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
