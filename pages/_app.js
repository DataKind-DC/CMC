// pages/_app.js
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-slider/assets/index.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-dates/lib/css/_datepicker.css';
import "react-toggle/style.css";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

import Router from 'next/router';

Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
    const timestamp = new Date().valueOf();
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
  }
})