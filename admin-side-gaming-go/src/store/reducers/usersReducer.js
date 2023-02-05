const users = {
    users: []
}

export default function userReducer(state = users, action){
    switch(action.type){
        case "fetchUser":
            return {
                ...state,
                users: action.payload
            }
        default:
            return {
                ...state
            }
    }
}