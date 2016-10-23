describe("Did Denver Score", function () {
    it("should return 7 on touchdown and field goal", function () {
        expect(didDenverScore("touchdown and field goal")).toBe(7);
    });

    it("should return 8 on touchdown and conversion", function () {
        expect(didDenverScore("touchdown and conversion")).toBe(8);
    });

    it("should return 6 on touchdown and missed extra point", function () {
        expect(didDenverScore("touchdown and missed extra point")).toBe(6);
    });

    it("should return 3 on field goal", function () {
        expect(didDenverScore("field goal")).toBe(3);
    });

    it("should return 0 on no score", function () {
        expect(didDenverScore("no score")).toBe(0);
    });
});