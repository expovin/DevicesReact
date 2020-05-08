import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

/** Global axios interceptors */

axios.interceptors.request.use( request =>{
  /**
   * Qui è possibile editare qualsiasi request in uscita
   * ad esempio aggiungere headers variable 
   * */ 

   return (request)
}, error => {
  /** 
   * Qui è possibile gestire centralmente tutti gli errori
   * in spedizione di requests
   */

   console.log("Errore nella spedizione della request. E' possibile gestirla globalmente da index.js")
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})

axios.interceptors.response.use( response =>{
  /**
   * Qui è possibile editare qualsiasi response in entrata
   * */ 

   return (response)
}, error => {
  /** 
   * Qui è possibile gestire centralmente tutti gli errori
   * in ricezione di response
   */

   console.log("Errore nella ricezione della response. E' possibile gestirla globalmente da index.js")
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
