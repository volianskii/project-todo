import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import store from './store/store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App name='David' />
  </Provider>

)
