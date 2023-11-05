import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  it("renders search input and reset button", () => {
    render(<SearchForm />);
    expect(
      screen.getByPlaceholderText("Search campaigns...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reset search/i })
    ).toBeInTheDocument();
  });
});
