import { FETCH_ALL_DEVICES, FETCH_BY_FILTER, FETCH_CATEGORIES, FETCH_HISTORY, FETCH_NEAREST_SUCCES, FETCH_TRANSACTION_SUCCESS, SET_TOKEN } from '../action/actionType';

const users = {
  users: [],
  // access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc1ODY4MzYzfQ.jVuRLVRTYJXxJuaNRdobjnY5YvKXahW15rcMnNHgtE8',
  // access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY3NTY5NDQ5MH0.FRCFAqcZgIQC5KcCZsRX1uxYyE6fO4KZ0bp5Q0HpoNo',
  access_token: '',
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
