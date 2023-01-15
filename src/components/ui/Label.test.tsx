import { render, screen, fireEvent } from "@testing-library/react";
import Label from "./Label";

describe("LabelUI test", () => {
    it("should render", () => {
        render(<Label type={"page"} word={"TestLabel"} />);
        expect(screen.queryByText("TestLabel")).toBeInTheDocument();
    });
});