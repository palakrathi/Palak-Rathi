const loginAction = {
    loginSuccess: function(name) {
        return {
            type: "LOGIN_SUCCESS",
            name,
        };
    },
};
export default loginAction;
