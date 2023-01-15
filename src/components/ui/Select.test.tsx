import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Select from "./Select";

describe("LabelUI test", () => {
    it("should render", () => {
        // render(<Select />);
        expect(screen.queryByText("TestLabel")).toBeInTheDocument();
    });
});