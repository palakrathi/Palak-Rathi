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
};
export default loginAction;
