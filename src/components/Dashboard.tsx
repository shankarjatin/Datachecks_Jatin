import React, { useState, useEffect } from 'react';
import TimeSeriesChart from './TimeSeriesChart.tsx';
import ColumnChart from './ColumnChart.tsx';
import SparklineChart from './SparklineChart.tsx';
import DateFilter from './DateFilter.tsx';
import axios from 'axios';


interface Booking {
  _id: string;
  hotel: string;
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

const Dashboard: React.FC = () => {
  const [timeSeriesData, setTimeSeriesData] = useState<{ x: string; y: number }[]>([]);
  const [countryData, setCountryData] = useState<{ country: string; visitors: number }[]>([]);
  const [adultData, setAdultData] = useState<number[]>([]);
  const [childData, setChildData] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        const year = selectedDate.getFullYear();
        const month = selectedDate.toLocaleString('default', { month: 'long' });
        const day = selectedDate.getDate();

        try {
          const response = await axios.get<Booking[]>('http://localhost:8000/api/hotel-data', {
            params: { year, month, day },
          });

          const data = response.data;

          // Process the response data for charts
          const timeSeriesMap: { [date: string]: number } = {};
          const countryMap: { [country: string]: number } = {};
          const adultsArray: number[] = [];
          const childrenArray: number[] = [];

          data.forEach(booking => {
            const date = `${booking.arrival_date_year}-${new Date(`${booking.arrival_date_month} 1, 2000`).getMonth() + 1}-${booking.arrival_date_day_of_month}`;
            const totalVisitors = booking.adults + booking.children + booking.babies;

            // Time series data
            if (timeSeriesMap[date]) {
              timeSeriesMap[date] += totalVisitors;
            } else {
              timeSeriesMap[date] = totalVisitors;
            }

            // Country data
            if (countryMap[booking.country]) {
              countryMap[booking.country] += totalVisitors;
            } else {
              countryMap[booking.country] = totalVisitors;
            }

            // Sparkline data
            adultsArray.push(booking.adults);
            childrenArray.push(booking.children);
          });

          // Update state for charts
          setTimeSeriesData(
            Object.entries(timeSeriesMap).map(([date, visitors]) => ({ x: date, y: visitors }))
          );
          setCountryData(
            Object.entries(countryMap).map(([country, visitors]) => ({ country, visitors }))
          );
          setAdultData(adultsArray);
          setChildData(childrenArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hotel Booking Dashboard</h1>
      <DateFilter onDateChange={setSelectedDate} />
     
      {countryData.length > 0 ? (
        <ColumnChart data={countryData} />
      ) : (
        <p className="text-center text-gray-500">No data available for the selected arrival date.</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {adultData.length > 0 ? (
          <SparklineChart title="Adults" total={adultData.reduce((a, b) => a + b, 0)} data={adultData} />
        ) : (
          <p className="text-center text-gray-500">No adult data available.</p>
        )}
        {childData.length > 0 ? (
          <SparklineChart title="Children" total={childData.reduce((a, b) => a + b, 0)} data={childData} />
        ) : (
          <p className="text-center text-gray-500">No children data available.</p>
        )}
       {timeSeriesData.length > 0 ? (
        <TimeSeriesChart data={timeSeriesData} />
      ) : (
        <p className="text-center text-gray-500">No data available for the selected arrival date.</p>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
