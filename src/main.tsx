import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthContextProvider from './contexts/AuthContext.tsx';
import { store } from './store.ts';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlM2JfiYWfDoj8MH8l_kVHfL4qPbuiCdk",
  authDomain: "notifi-4276f.firebaseapp.com",
  projectId: "notifi-4276f",
  storageBucket: "notifi-4276f.appspot.com",
  messagingSenderId: "738410364408",
  appId: "1:738410364408:web:4d3f7bfd71238cda7fea0d",
  measurementId: "G-YKMXN67XH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
