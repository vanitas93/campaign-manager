import React, { useContext } from "react";
import TablePagination from "@mui/material/TablePagination";
import { Campaign } from "../../types/campaign";
import styles from "./CampaignList.module.css";
import { CampaignContext } from "../../context/CampaignContext";

const CampaignList: React.FC = () => {
  const {
    paginatedCampaigns,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    campaigns,
  } = useContext(CampaignContext);

  const checkIsActive = (startDate: string, endDate: string): boolean => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= today && today <= end;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <table className={styles.campaignList}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget (USD)</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCampaigns.map((campaign: Campaign) => {
            const isActive = checkIsActive(
              campaign.startDate,
              campaign.endDate
            );
            return (
              <tr
                key={campaign.id}
                className={isActive ? styles.active : styles.inactive}
              >
                <td>{campaign.name}</td>
                <td>{campaign.startDate}</td>
                <td>{campaign.endDate}</td>
                <td>{isActive ? "Active" : "Inactive"}</td>
                <td>${campaign.budget.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <TablePagination
        component="div"
        count={campaigns.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CampaignList;
