import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateFilterProps {
  onDateChange: (date: Date | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="flex flex-col mb-6 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">Select Arrival Date:</h3>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        placeholderText="Click to select a date"
        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DateFilter;
