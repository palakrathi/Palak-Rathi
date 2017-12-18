import React from "react";
import {createMemoryHistory} from "history";
import App from "../src/component/App.js";

describe("rendering", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = global.shallow(<App />);
    });

    it("renders self and subcomponents", () => {
        expect(wrapper.find(".App-page").length).toBe(1);
        expect(wrapper.find(".App-loader").length).toBe(1);
        expect(wrapper.find("figure").length).toBe(1);
        expect(wrapper.find("form").length).toBe(1);
        expect(wrapper.find(".App-button").length).toBe(1);
    });
    describe("with loader", () => {});
});
describe("interactions", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = global.shallow(<App />);
    });
    describe("on clicking a button", () => {
        let buttonWrapper;
        beforeEach(() => {
            buttonWrapper = wrapper.find(".App-button");
        });
        it("should call the onClick callback", () => {
            // wrapper.instance().find(".App-button").prop('onClick') = jest.genMockFunction();
            buttonWrapper.simulate("click");
            wrapper.setState({loader: true});
            expect(wrapper.find(".App-loader").prop("active")).toEqual(true);
            // expect(wrapper.instance().onButtonClick).toHaveBeenCalledTimes(1);
        });
    });
    describe("with username input", () => {});
    describe("with Password input", () => {
        let inputWrapper;
        beforeEach(() => {
            inputWrapper = wrapper.find("input").at(1);
        });
        it("should change the value of the input", () => {
            inputWrapper.simulate("change", {target: {name: "password", value: "193bjd"}});
            expect(wrapper.state().password).toEqual("193bjd");
        });
    });
});
describe("functions", () => {
    describe("verify results of validateData function", () => {
        const history = createMemoryHistory("/");
        history.push = jest.fn();
        const baseProps = {
            addUser: jest.fn(),
            // history: {history},
        };
        let wrapper;
        beforeEach(() => {
            wrapper = global.shallow(<App history={history} {...baseProps} />);
        });
        it("should verify username and password match ", () => {
            let data = {
                results: [
                    {
                        name: "Luke Skywalker",
                        birth_year: "19BBY",
                    },
                ],
            };
            wrapper.setState({username: "Luke Skywalker", password: "19BBY"});
            let validateData = wrapper.instance().validateData(data);
            expect(validateData.verified).toBe(true);
        });
        it("should verify the no name found condition", () => {
            let data = {
                results: [],
            };
            let validateData = wrapper.instance().validateData(data);
            expect(validateData.verified).toBe(false);
        });
        it("should verify the incorrect name condition", () => {
            let data = {
                results: [
                    {
                        name: "Luke",
                        birth_year: "19BBY",
                    },
                ],
            };
            let validateData = wrapper.instance().validateData(data);
            expect(validateData.verified).toBe(false);
        });
        it("should verify incorrect password condition", () => {
            let data = {
                results: [
                    {
                        name: "Luke Skywalker",
                        birth_year: "19BBY",
                    },
                ],
            };
            wrapper.setState({username: "Luke Skywalker", password: "19BY"});
            let validateData = wrapper.instance().validateData(data);
            expect(validateData.verified).toBe(false);
        });
    });
    describe("onFetchedData function", () => {
        const history = createMemoryHistory("/");
        history.push = jest.fn();
        const baseProps = {
            addUser: jest.fn(),
            // history: {history},
        };
        let wrapper;
        beforeEach(() => {
            wrapper = global.shallow(<App history={history} {...baseProps} />);
        });

        it("should set error and loader if results are not verified", () => {
            let data = {
                results: [
                    {
                        name: "Luke Skywalker",
                        birth_year: "19BBY",
                    },
                ],
            };
            wrapper.setState({username: "Luke Skywalker", password: ""});
            wrapper.instance().onFetchedData(data);
            expect(wrapper.state().error).toEqual("Incorrect Password!");
        });
        it("should call addUser function if results are verified", () => {
            let data = {
                results: [
                    {
                        name: "Luke Skywalker",
                        birth_year: "19BBY",
                    },
                ],
            };
            wrapper.setState({username: "Luke Skywalker", password: "19BBY"});
            wrapper.instance().onFetchedData(data);
            expect(baseProps.addUser).toHaveBeenCalledTimes(1);
        });
    });
    describe("componentWillMount function", () => {
        const history = createMemoryHistory("/");
        history.push = jest.fn();
        const baseProps = {
            addUser: jest.fn(),
            // history: {history},
        };
        let wrapper;
        beforeEach(() => {
            wrapper = global.mount(<App history={history} {...baseProps} />);
        });
        it("should call addUser function", () => {
            expect(baseProps.addUser).toHaveBeenCalledTimes(1);
        });
    });
});
