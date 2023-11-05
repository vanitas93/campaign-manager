import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActiveStatusFilter from "./ActiveStatusFilter";

describe("ActiveStatusFilter", () => {
  it("renders the dropdown with all status options", () => {
    render(<ActiveStatusFilter />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Active" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Inactive" })
    ).toBeInTheDocument();
  });
});
