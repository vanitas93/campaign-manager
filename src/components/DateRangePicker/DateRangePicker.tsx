import React, { useState, useContext } from "react";
import { CampaignContext } from "../../context/CampaignContext";

const DateRangePicker: React.FC = () => {
  const { setDateFilter } = useContext(CampaignContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && newStartDate > endDate) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startDate) {
      setEndDate(e.target.value);
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setDateFilter({ start: null, end: null });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDateFilter({
      start: startDate ? new Date(startDate) : null,
      end: endDate ? new Date(endDate) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={startDate} onChange={handleStartDateChange} />
      <input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        min={startDate}
      />
      <button type="submit">Filter</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default DateRangePicker;
