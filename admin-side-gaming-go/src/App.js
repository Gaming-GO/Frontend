// import logo from './logo.svg';
import './App.css';
import router from './routers'
import { RouterProvider } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <body>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </body>
  );
}

export default App;
