import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Campaign } from "../types/campaign";
import initialData from "../data.json";

interface DateFilter {
  start: Date | null;
  end: Date | null;
}

interface CampaignContextProps {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  searchFilter: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  dateFilter: DateFilter;
  setDateFilter: React.Dispatch<React.SetStateAction<DateFilter>>;
  activeStatusFilter: string;
  setActiveStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  paginatedCampaigns: Campaign[];
}

interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignContext = createContext<CampaignContextProps>({
  campaigns: [],
  setCampaigns: () => {},
  searchFilter: "",
  setSearchFilter: () => {},
  dateFilter: { start: null, end: null },
  setDateFilter: () => {},
  activeStatusFilter: "all",
  setActiveStatusFilter: () => {},
  page: 0,
  setPage: () => {},
  rowsPerPage: 10,
  setRowsPerPage: () => {},
  totalPages: 0,
  paginatedCampaigns: [],
});

export const CampaignProvider: React.FC<CampaignProviderProps> = ({
  children,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialData);
  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    start: null,
    end: null,
  });
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const checkIsActive = (startDate: string, endDate: string): boolean => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= today && today <= end;
  };

  const getFilteredCampaigns = (): Campaign[] => {
    return campaigns
      .filter((campaign) =>
        campaign.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
      .filter((campaign) => {
        if (activeStatusFilter === "all") return true;
        return activeStatusFilter === "active"
          ? checkIsActive(campaign.startDate, campaign.endDate)
          : !checkIsActive(campaign.startDate, campaign.endDate);
      })
      .filter((campaign) => {
        const [startMonth, startDay, startYear] = campaign.startDate.split("/");
        const [endMonth, endDay, endYear] = campaign.endDate.split("/");
        const campaignStart = new Date(+startYear, +startMonth - 1, +startDay);
        const campaignEnd = new Date(+endYear, +endMonth - 1, +endDay);
        return (
          (!dateFilter.start || campaignStart >= dateFilter.start) &&
          (!dateFilter.end || campaignEnd <= dateFilter.end)
        );
      });
  };

  useEffect(() => {
    setCampaigns(initialData);
  }, []);

  const totalPages = Math.ceil(getFilteredCampaigns().length / rowsPerPage);

  const getPaginatedCampaigns = (): Campaign[] => {
    const startIndex = page * rowsPerPage;
    return getFilteredCampaigns().slice(startIndex, startIndex + rowsPerPage);
  };

  const addCampaigns = (newCampaigns: Campaign[]) => {
    setCampaigns((currentCampaigns) => {
      const combinedCampaigns = [...currentCampaigns, ...newCampaigns];
      const uniqueCampaigns = Array.from(
        new Map(
          combinedCampaigns.map((campaign) => [campaign.id, campaign])
        ).values()
      );
      return uniqueCampaigns;
    });
  };

  useEffect(() => {
    // @ts-ignore to bypass TypeScript errors regarding window object typing
    window.addCampaigns = addCampaigns;
  }, [addCampaigns]);

  const value = {
    campaigns: getFilteredCampaigns(),
    setCampaigns,
    searchFilter,
    setSearchFilter,
    dateFilter,
    setDateFilter,
    activeStatusFilter,
    setActiveStatusFilter,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    paginatedCampaigns: getPaginatedCampaigns(),
    addCampaigns,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContext;
