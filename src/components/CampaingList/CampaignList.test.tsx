import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CampaignList from "./CampaignList";

describe("CampaignList", () => {
  it("renders table headers correctly", () => {
    render(<CampaignList />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Budget (USD)")).toBeInTheDocument();
  });
});
