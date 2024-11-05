import React, { useState, useEffect } from 'react';
import TimeSeriesChart from './TimeSeriesChart.tsx';
import ColumnChart from './ColumnChart.tsx';
import SparklineChart from './SparklineChart.tsx';
import DateFilter from './DateFilter.tsx';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [timeSeriesData, setTimeSeriesData] = useState<{ x: string; y: number }[]>([]);
  const [countryData, setCountryData] = useState<{ country: string; visitors: number }[]>([]);
  const [adultData, setAdultData] = useState<number[]>([]);
  const [childData, setChildData] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = () => {
      const params = {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      };

      axios.get('http://localhost:8000/api/hotels', { params })
        .then(response => {
          const data = response.data;
          setTimeSeriesData(data.timeSeries);
          setCountryData(data.countries);
          setAdultData(data.adults);
          setChildData(data.children);
        });
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hotel Booking Dashboard</h1>
      <DateFilter onDateChange={(start, end) => { setStartDate(start); setEndDate(end); }} />
      <TimeSeriesChart data={timeSeriesData} />
      <ColumnChart data={countryData} />
      <div className="grid grid-cols-2 gap-4">
        <SparklineChart title="Adults" total={adultData.reduce((a, b) => a + b, 0)} data={adultData} />
        <SparklineChart title="Children" total={childData.reduce((a, b) => a + b, 0)} data={childData} />
      </div>
    </div>
  );
};

export default Dashboard;
