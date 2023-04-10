import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/reset.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { worker } from './mocks/worker';
import { QueryClient, QueryClientProvider } from 'react-query';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './modules';
import { applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
const store = createStore(rootReducer, applyMiddleware(Thunk));

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </CookiesProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
