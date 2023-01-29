import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RedditItemsContainer from './components/redditItemsContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RedditItemsContainer />
  </React.StrictMode>
);


reportWebVitals();
