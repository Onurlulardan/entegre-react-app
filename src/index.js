import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './assets/Css/main.css';
import './assets/Css/app.min.css';
import './assets/Css/bootstrap.min.css';
import './assets/Css/custom.min.css';
import './assets/Css/icons.min.css';

import './assets/libs/jsvectormap/css/jsvectormap.min.css';
import './assets/libs/swiper/swiper-bundle.min.css';

// JAVASCRIPT
// import "../src/assets/js/layout.js"; daha sonra bakılacak keywords hatası


// import "../src/assets/libs/bootstrap/js/bootstrap.bundle.min.js";
// import "../src/assets/libs/simplebar/simplebar.min.js";
// import "../src/assets/libs/node-waves/waves.min.js";
// import "../src/assets/libs/feather-icons/feather.min.js";
// import "../src/assets/js/pages/plugins/lord-icon-2.1.0.js";
// import "../src/assets/js/plugins.js";

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
