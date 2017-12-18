import fetchData from "../src/helpers/fetchData.js";
import fetchMock from "fetch-mock";

describe("testing fetchData", () => {
    it("should match the results", () => {
        fetchMock.get("https://swapi.co/api/planets?search=al", {
            results: [
                {name: "palak", population: "unknown"},
                {name: "sabiya", population: 123456},
                {name: "rahul", population: 234561},
            ],
        });
        fetchData("planets?search=al").then(results => {
            expect(results).toEqual({
                results: [
                    {name: "palak", population: "unknown"},
                    {name: "sabiya", population: 123456},
                    {name: "rahul", population: 234561},
                ],
            });
        });

        fetchMock.restore();
    });
});
