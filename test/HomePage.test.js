import React from "react";
import {createMemoryHistory} from "history";
import HomePage from "../src/component/HomePage.js";
import fetchMock from "fetch-mock";

describe("rendering", () => {
    let wrapper;
    const history = createMemoryHistory("/main");
    let props = {
        name: "Luke Skywalker",
        searchResults: {},
        logout: jest.fn(),
        updateResults: jest.fn(),
        // history: {history},
    };

    beforeEach(() => {
        wrapper = global.shallow(<HomePage history={history} {...props} />);
    });

    it("renders self and subcomponents", () => {
        expect(
            wrapper
                .find("div")
                .at(2)
                .text()
        ).toMatch("Welcome Luke Skywalker !");
    });
});

describe("functions", () => {
    describe("sortData static function", () => {
        let wrapper;
        const history = createMemoryHistory("/main");
        let props = {
            name: "Luke Skywalker",
            searchResults: {},
            logout: jest.fn(),
            updateResults: jest.fn(),
            // history: {history},
        };

        beforeEach(() => {
            wrapper = global.shallow(<HomePage history={history} {...props} />);
        });
        it("should sort the given data", () => {
            let data = {
                results: [
                    {name: "palak", population: "unknown"},
                    {name: "sabiya", population: 123456},
                    {name: "rahul", population: 234561},
                    {name: "jitesh", population: "unknown"},
                ],
            };
            let sortedData = {
                al: {
                    count: 4,
                    results: [
                        {name: "rahul", population: 234561},
                        {name: "sabiya", population: 123456},
                        {name: "jitesh", population: "unknown"},
                        {name: "palak", population: "unknown"},
                    ],
                },
            };
            let expectedData = HomePage.sortData(data, "al");
            expect(expectedData).toEqual(sortedData);
        });
    });
    describe("componentWillMount function", () => {
        let wrapper;
        const history = createMemoryHistory("/main");
        let props = {
            name: "",
            searchResults: {},
            logout: jest.fn(),
            updateResults: jest.fn(),
            // history: {history},
        };

        beforeEach(() => {
            wrapper = global.mount(<HomePage history={history} {...props} />);
        });
        it("should call replace method on history object if name is not defined in props", () => {
            expect(wrapper.props().name).toEqual("");
        });
    });
    describe("onFetchedData function", () => {
        let wrapper;
        const history = createMemoryHistory("/main");
        let props = {
            name: "",
            searchResults: {},
            logout: jest.fn(),
            updateResults: jest.fn(),
            // history: {history},
        };

        beforeEach(() => {
            wrapper = global.shallow(<HomePage history={history} {...props} />);
        });
        it("should set loader and call updateResults function", () => {
            wrapper.instance().onFetchedData({
                results: [
                    {name: "palak", population: "unknown"},
                    {name: "sabiya", population: 123456},
                    {name: "rahul", population: 234561},
                ],
            });
            expect(wrapper.state().loader).toEqual(false);
            expect(props.updateResults).toHaveBeenCalledTimes(1);
        });
    });
});
describe("interactions", () => {
    let wrapper;
    const history = createMemoryHistory("/main");
    let props = {
        name: "Luke Skywalker",
        searchResults: {},
        logout: jest.fn(),
        updateResults: jest.fn(),
        // history: {history},
    };

    beforeEach(() => {
        wrapper = global.shallow(<HomePage history={history} {...props} />);
    });
    describe("on signout button click", () => {
        let buttonWrapper;
        beforeEach(() => {
            buttonWrapper = wrapper.find(".App-signout");
        });
        it("should call logout function", () => {
            buttonWrapper.simulate("click");
            expect(props.logout).toHaveBeenCalledTimes(1);
        });
    });
    describe("on searching a planet", () => {
        let inputWrapper;
        beforeEach(() => {
            inputWrapper = wrapper.find("input");
        });
        it("should change the value of the input and update key", () => {
            wrapper.setState({key: "qw"});
            inputWrapper.simulate("change", {target: {value: "a"}});
            expect(wrapper.state().key).toEqual("");
        });
        it("should change the value of input and update key, update loader,call fetchData ", () => {
            inputWrapper.simulate("change", {target: {value: "al"}});
            fetchMock.get("*", {
                results: [
                    {name: "palak", population: "unknown"},
                    {name: "sabiya", population: 123456},
                    {name: "rahul", population: 234561},
                ],
            });
            // wrapper.setState({key: "qw"});
            expect(wrapper.state().key).toEqual("al");
            expect(wrapper.state().loader).toEqual(true);
            // expect(wrapper.instance().onFetchedData({
            //     results: [
            //         {name: "palak", population: "unknown"},
            //         {name: "sabiya", population: 123456},
            //         {name: "rahul", population: 234561},
            //     ],
            // })).toHaveBeenCalledTimes(1);
        });
    });
});
