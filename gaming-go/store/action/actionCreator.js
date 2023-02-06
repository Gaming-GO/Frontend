import { FETCH_USER, SET_TOKEN } from './actionType';

// const baseUrl = 'http://localhost:3001';
const baseUrl = 'https://3104-2001-448a-110d-1aea-468-5dbe-c57f-7bee.ap.ngrok.io';

export const setToken = (payload) => {
  // console.log(payload, '<<<<<<<< ini payload');
  return {
    type: SET_TOKEN,
    payload,
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
