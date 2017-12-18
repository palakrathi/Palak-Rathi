import username from "../src/reducers/username.js";
import searchResults from "../src/reducers/searchResults.js";

describe("reducer", () => {
    it("should handle loginSuccess", () => {
        expect(
            username("", {
                type: "LOGIN_SUCCESS",
                name: "palak",
            })
        ).toEqual("palak");
    });
    it("should handle logout", () => {
        expect(username({name: "palak"}, {type: "LOGOUT"})).toEqual("");
    });
    it("should handle default condition", () => {
        expect(username({name: "palak"}, {type: ""})).toEqual({name: "palak"});
    });
    it("should set default state as empty string", () => {
        let returnedState = username(undefined, {type: ""});
        expect(returnedState).toEqual("");
    });
    it("should handle UpdatePlanetsSearch", () => {
        expect(
            searchResults(
                {ad: [{}]},
                {
                    type: "UPDATE_PLANET_SEARCH",
                    results: {al: [{name: "palak", birth_year: "19BBY"}]},
                }
            )
        ).toEqual({ad: [{}], al: [{name: "palak", birth_year: "19BBY"}]});
    });
    it("should return default state if action type does not match", () => {
        expect(
            searchResults(
                {ad: [{}]},
                {
                    type: "",
                    results: {al: [{name: "palak", birth_year: "19BBY"}]},
                }
            )
        ).toEqual({ad: [{}]});
    });
    it("should set default state as empty object", () => {
        let returnedState = searchResults(undefined, {
            type: "",
            results: {al: [{name: "palak", birth_year: "19BBY"}]},
        });
        expect(returnedState).toEqual({});
    });
});
