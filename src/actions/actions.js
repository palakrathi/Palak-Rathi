const loginAction = {
    loginSuccess: function(name) {
        return {
            type: "LOGIN_SUCCESS",
            name,
        };
    },
    logout: function() {
        return {
            type: "LOGOUT",
        };
    },
    UpdatePlanetsSearch: function(results) {
        return {
            type: "UPDATE_PLANET_SEARCH",
            results,
        };
    },
};
export default loginAction;
