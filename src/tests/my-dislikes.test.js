import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyDislikes from "../components/profile/my-dislikes";

test("test dislike render", async () => {
  render(<MyDislikes />);
  const linkElement = screen.getByText(/Cat/i);
  expect(linkElement).toBeInTheDocument();
});
