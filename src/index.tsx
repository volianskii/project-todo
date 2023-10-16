import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import store from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
)
