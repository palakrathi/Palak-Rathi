export default function username(state = "", action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return action.name;
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}
