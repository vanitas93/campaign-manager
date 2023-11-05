import React, { useContext } from "react";
import { CampaignContext } from "../../context/CampaignContext";

const SearchForm: React.FC = () => {
  const { searchFilter, setSearchFilter } = useContext(CampaignContext);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchFilter("");
  };

  return (
    <div>
      <input
        type="text"
        value={searchFilter}
        onChange={handleSearch}
        placeholder="Search campaigns..."
      />
      <button onClick={handleResetSearch}>Reset Search</button>
    </div>
  );
};

export default SearchForm;
