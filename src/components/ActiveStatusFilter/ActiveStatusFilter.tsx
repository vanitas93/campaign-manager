import React, { useContext } from "react";
import { CampaignContext } from "../../context/CampaignContext";

const ActiveStatusFilter: React.FC = () => {
  const { activeStatusFilter, setActiveStatusFilter } =
    useContext(CampaignContext);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveStatusFilter(e.target.value);
  };

  return (
    <div>
      <label htmlFor="status-filter">Status:</label>
      <select
        id="status-filter"
        value={activeStatusFilter}
        onChange={handleStatusChange}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default ActiveStatusFilter;
