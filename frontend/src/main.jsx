import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App.jsx'
import reducers from './reducers/index.js'
import { fetchProfile } from './actions/user.js';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const store = configureStore({
  reducer: reducers,       // This can be a combined reducer or a single one
});

// Rehydrate Redux state from localStorage token on app start
if (localStorage.getItem('token')) {
  store.dispatch(fetchProfile());
}
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> */}
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
    {/* </GoogleOAuthProvider> */}
  </Provider>,
)