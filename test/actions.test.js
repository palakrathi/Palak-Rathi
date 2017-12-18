import loginAction from "../src/actions/loginAction.js";
import searchPlanetsAction from "../src/actions/searchPlanetsAction.js";

describe("actions", () => {
    it("should create an action to login", () => {
        const name = "palak";
        const expectedloginAction = {
            type: "LOGIN_SUCCESS",
            name,
        };
        expect(loginAction.loginSuccess(name)).toEqual(expectedloginAction);
    });
    it("should create an action to logout", () => {
        const expectedlogoutAction = {
            type: "LOGOUT",
        };
        expect(loginAction.logout()).toEqual(expectedlogoutAction);
    });
    it("should create an action to update search planets results ", () => {
        const results = {al: [{name: "palak", birth_year: "19BBY"}]};
        const expectedSearchPlanetsAction = {
            type: "UPDATE_PLANET_SEARCH",
            results,
        };
        expect(searchPlanetsAction.UpdatePlanetsSearch(results)).toEqual(expectedSearchPlanetsAction);
    });
});
