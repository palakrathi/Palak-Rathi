import React from "react";
import PlanetsPopulation from "../src/component/PlanetsPopulation.js";

describe("functional component", () => {
    let wrapper;

    describe("results and results.count true condition", () => {
        let results = {
            count: 3,
            results: [
                {name: "rahul", population: 234561},
                {name: "sabiya", population: 123456},
                {name: "palak", population: "unknown"},
            ],
        };

        beforeEach(() => {
            wrapper = global.shallow(<PlanetsPopulation results={results} />);
        });
        it("should render table", () => {
            expect(wrapper.getElement()).not.toBe(null);
        });
    });
    describe("results true condition", () => {
        let results = {};

        beforeEach(() => {
            wrapper = global.shallow(<PlanetsPopulation results={results} />);
        });
        it("should render table", () => {
            expect(wrapper.getElement()).not.toBe(null);
        });
    });
    describe("results null condition", () => {
        let results = null;

        beforeEach(() => {
            wrapper = global.shallow(<PlanetsPopulation results={results} />);
        });
        it("should render table", () => {
            expect(wrapper.getElement()).toBe(null);
        });
    });
});
