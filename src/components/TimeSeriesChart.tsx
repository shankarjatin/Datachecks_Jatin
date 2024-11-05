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
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: 'zoom' // Default selection tool
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MMM dd, yyyy',
        style: {
          colors: [],
          fontSize: '12px',
        },
      },
      axisBorder: {
        color: '#78909C',
      },
      axisTicks: {
        color: '#78909C',
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        },
        style: {
          colors: [],
          fontSize: '12px',
        }
      }
    },
    markers: {
      size: 5,
      colors: ['#FF4560'],
      strokeColor: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      }
    },
    grid: {
      borderColor: '#ECEFF1',
    },
    theme: {
      mode: 'light',
    },
    tooltip: {
      x: {
        format: 'MMM dd, yyyy'
      },
      fixed: {
        enabled: false,
        position: 'topRight',
      }
    },
  };

  const series = [{ name: 'Visitors', data }];

  return (
    <div className="bg-white shadow-xl rounded-xl p-5 mb-5">
      <h2 className="text-2xl font-semibold mb-4">Visitors Over Time</h2>
      <ReactApexChart options={options} series={series} type="line" height={380} />
    </div>
  );
};

export default TimeSeriesChart;
