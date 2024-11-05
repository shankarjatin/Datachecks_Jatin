import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateFilterProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end);
  };

  return (
    <div className="flex flex-col mb-6">
      <h3 className="text-lg font-semibold mb-2">Select Date Range:</h3>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable
        dateFormat="yyyy/MM/dd"
        placeholderText="Select a date range"
        className="p-2 border rounded-md w-full"
      />
    </div>
  );
};

export default DateFilter;
