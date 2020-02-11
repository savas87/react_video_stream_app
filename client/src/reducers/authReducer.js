const initState = {
    isSignedIn: null,
    userId: null,
    login: null
}
export default (state = initState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return Object.assign({}, state, {
                isSignedIn: true,
                userId: action.payload,
                login: null
            });
        case 'SIGN_OUT':
            return Object.assign({}, state, {
                isSignedIn: false,
                userId: null,
                login: null
            });
        case 'LOG_IN':
            return Object.assign({}, state, {
                isSignedIn: false,
                userId: null,
                login: !state.login
            })
        default:
            return state;
    }
}