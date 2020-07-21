import Appointment from "components/Appointment/index";
import React from "react";
import { render } from "@testing-library/react";
import Application from "components/Application";

xit("renders without crashing", () => {
  render(<Application />);
});

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});