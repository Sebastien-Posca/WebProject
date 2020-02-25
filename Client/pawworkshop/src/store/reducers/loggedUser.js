
const defaultState = { userProfil: null, userToken: null }

const loggedUser = (state = defaultState, action) => {
    switch (action.type) {
        case "user_profil":
            return { ...state, userProfil: action.user };
        case "user_token":
            return { ...state, userToken: action.token };
        default:
            return state;
    }
};

export default loggedUser;