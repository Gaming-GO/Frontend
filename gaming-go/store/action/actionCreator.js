import { useSelector } from 'react-redux';
import { FETCH_ALL_DEVICES, FETCH_BY_FILTER, FETCH_CATEGORIES, FETCH_NEAREST_SUCCES, FETCH_TRANSACTION_SUCCESS, FETCH_USER, SET_TOKEN } from './actionType';

// const baseUrl = 'http://localhost:3001';

const baseUrl = 'https://e06d-2001-448a-1101-171a-85d2-8409-5431-4c0.ap.ngrok.io';

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
        console.log('BSIANIH');
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
        console.log(data);
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
        console.log(' HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
        console.log(data);
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
        console.log(data);
        dispatch(fetchAllDevices());
      });
  };
};

// export const registerHandler = (input) => {
//   return fetch(url + '/admin/register', {
//     method: 'POST',
//     body: JSON.stringify(input),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// };

// export const LoginHandler = (input) => {
//   return fetch(url + '/admin/login', {
//     method: 'post',
//     body: JSON.stringify(input),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       localStorage.setItem('access_token', data.access_token);
//     });
// };

// export const fetchUserSuccess = (payload) => {
//   console.log(payload, '<<<<<<<< ini payload');
//   return {
//     type: FETCH_USER,
//     payload,
//   };
// };

// export const fetchUser = () => {
//   return (dispatch) => {
//     fetch(url + '/admin/users', {
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json',
//         access_token: localStorage.access_token,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         dispatch(fetchUserSuccess(data));
//       });
//   };
// };

// // export const EditMenu = (input, id) => {
// //     return(dispatch) => {
// //         fetch(url + `/admin/users/${id}`, {
// //             method: 'patch',
// //             body: JSON.stringify(input),
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 access_token: localStorage.access_token
// //             }
// //         })
// //             .then(response => response.json())
// //             .then(data => console.log('menu has been updated', data))
// //             .catch(err => console.log('>>>ERROR<<<', err))
// //     }
// // }

// // export const deleteMenu = (id) => {
// //     return(dispatch) => {
// //         fetch(url + `/meals/${id}`, {
// //             method: 'delete',
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             }
// //         })
// //             .then(() => dispatch(fetchMeals()))
// //             .catch(err => console.log(err))
// //     }
// // }

// export const approveUser = (id) => {
//   return (dispatch) => {
//     fetch(url + `/admin/users/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         access_token: localStorage.getItem('access_token'),
//       },
//     })
//       .then(() => dispatch(fetchUser()))
//       .catch((err) => console.log('>>>ERROR<<<', err));
//   };
// };

// export const disapproveUser = (id) => {
//   return (dispatch) => {
//     fetch(url + `/admin/users/disapprove/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         access_token: localStorage.getItem('access_token'),
//       },
//     })
//       .then(() => dispatch(fetchUser()))
//       .catch((err) => console.log('>>>ERROR<<<', err));
//   };
// };
