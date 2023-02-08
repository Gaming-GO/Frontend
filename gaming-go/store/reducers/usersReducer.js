import { FETCH_ALL_DEVICES, FETCH_BY_FILTER, FETCH_CATEGORIES, FETCH_HISTORY, FETCH_NEAREST_SUCCES, FETCH_TRANSACTION_SUCCESS, SET_TOKEN } from '../action/actionType';

const users = {
  users: [],
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY3NTczODk1MH0.r5CBmaVFGZ-clRgBML7z7Rmiz1sKXOD7Y-HqSZMAFm0',
  Transaction: { Details: [] },
  nearest: [],
  categories: [],
  allDevices: [],
  filteredDevices: [],
  History: [],
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
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        Transaction: action.payload,
      };
    case FETCH_NEAREST_SUCCES:
      return {
        ...state,
        nearest: action.payload,
      };

    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case FETCH_ALL_DEVICES:
      return {
        ...state,
        allDevices: action.payload,
      };

    case FETCH_BY_FILTER:
      return {
        ...state,
        filteredDevices: action.payload,
      };

    case FETCH_HISTORY:
      return {
        ...state,
        History: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
