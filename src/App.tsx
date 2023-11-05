import CampaignList from "./components/CampaingList/CampaignList";
import SearchForm from "./components/SearchForm/SearchForm";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
import ActiveStatusFilter from "./components/ActiveStatusFilter/ActiveStatusFilter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Campaign Manager</h1>
      <div className="filters-container">
        <SearchForm />
        <ActiveStatusFilter />
        <DateRangePicker />
      </div>
      <CampaignList />
    </div>
  );
}

export default App;
