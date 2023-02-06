import { SET_TOKEN } from '../action/actionType';

const users = {
  users: [],
  access_token: '',
};

export default function userReducer(state = users, action) {
  switch (action.type) {
    case 'fetchUser':
      return {
        ...state,
        users: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        access_token: action.payload.access_token,
      };
    default:
      return {
        ...state,
      };
  }
}
