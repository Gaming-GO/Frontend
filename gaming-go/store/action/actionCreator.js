import { useSelector } from 'react-redux';
import { FETCH_ALL_DEVICES, FETCH_BY_FILTER, FETCH_CATEGORIES, FETCH_HISTORY, FETCH_NEAREST_SUCCES, FETCH_TRANSACTION_SUCCESS, FETCH_USER, SET_TOKEN } from './actionType';

// const baseUrl = 'http://localhost:3001';

const baseUrl = 'https://ad2d-139-192-36-123.ap.ngrok.io';

export const setToken = (payload) => {
  // console.log(payload, '<<<<<<<< ini payload');
  return {
    type: SET_TOKEN,
    payload,
  };
};

export const fetchTransactionSuccess = (payload) => {
  return {
    type: FETCH_TRANSACTION_SUCCESS,
    payload,
  };
};

export const fetchTransaction = (access_token) => {
  // const access_token = useSelector((state) => state.users.access_token);

  return (dispatch) => {
    return fetch(baseUrl + '/pub/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data, 'DARI SLEBEW');
        dispatch(fetchTransactionSuccess(data));
      });
  };
};

export const addTransactionFromHehe = (id, access_token, temp) => {
  // console.log('masuk add');
  return (dispatch) => {
    return fetch(baseUrl + `/pub/rent/${id}`, {
      method: 'POST',
      body: JSON.stringify({ rentEnd: temp }),
      headers: {
        'Content-Type': 'application/json',
        access_token: access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('BSIANIH');
        dispatch(fetchTransaction(access_token));
        // navigation.navigate('HomeScreen');
      });
  };
};

export const successCheckoutSlebew = (access_token) => {
  return (dispatch) => {
    return fetch(baseUrl + '/pub/checkout', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log(uriMidtrans);
        // navigation.navigate('HomeScreen');
        dispatch(fetchTransaction(access_token));
      });
  };
};

export const fetchNearestSuccess = (payload) => {
  return {
    type: FETCH_NEAREST_SUCCES,
    payload,
  };
};

export const fetchNearest = (access_token) => {
  return (dispatch) => {
    return fetch(baseUrl + '/pub/nearest', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(' HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
        // console.log(data);
        dispatch(fetchNearestSuccess(data));
        // console.log(uriMidtrans);
        // navigation.navigate('HomeScreen');
        // dispatch(fetchTransaction(access_token));
      });
  };
};

export const fetchCategoriesSuccess = (payload) => {
  return {
    type: FETCH_CATEGORIES,
    payload,
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    return fetch(baseUrl + '/pub/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchCategoriesSuccess(data));
      });
  };
};

export const fetchAllDevicesSuccess = (payload) => {
  return {
    type: FETCH_ALL_DEVICES,
    payload,
  };
};

export const fetchAllDevices = () => {
  return (dispatch) => {
    return fetch(baseUrl + '/pub/devices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        dispatch(fetchAllDevicesSuccess(data));
      });
  };
};

export const fetchByFilterSuccess = (payload) => {
  return {
    type: FETCH_BY_FILTER,
    payload,
  };
};

export const fetchByFilter = (id) => {
  return (dispatch) => {
    return fetch(baseUrl + `/pub/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // dispatch(fetchAllDevicesSuccess(data));
        dispatch(fetchByFilterSuccess(data));
        // console.log(data);
        // dispatch(fetchAllDevicesSuccess(data));
      });
  };
};

export const postDevice = (input, access_token) => {
  return (dispatch) => {
    return fetch(baseUrl + `/pub/devices`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // dispatch(fetchAllDevicesSuccess(data));
        // dispatch(fetchByFilterSuccess(data));
        // console.log(data);
        dispatch(fetchAllDevices());
      });
  };
};

export const fetchHistorySuccess = (payload) => {
  return {
    type: FETCH_HISTORY,
    payload,
  };
};

export const fetchHistory = (access_token) => {
  return (dispatch) => {
    return fetch(baseUrl + `/pub/histories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchHistorySuccess(data));
      });
  };
};