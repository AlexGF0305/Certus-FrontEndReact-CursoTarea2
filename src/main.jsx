import React from 'react';
import ReactDOM from 'react-dom';
import { RickAndMortyCharacters } from './RickMorty';
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RickAndMortyCharacters />
  </React.StrictMode>
);
