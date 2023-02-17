import { useState } from 'react';

import './App.css';

function App() {
  const [url, setUrl] = useState('');
  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <input id="user_input"></input>
      <button id="submit_btn" onClick={() => shortenURL(setUrl)}>
        Shorten URL
      </button>
      <p id="shortened_url">
        <a href={url}>{url}</a>
      </p>
    </div>
  );
}

export default App;

function shortenURL(setUrl) {
  let user_input = document.getElementById('user_input').value;
  fetch('http://localhost:3000/shorten', {
    method: 'POST',
    body: new URLSearchParams({
      longUrl: user_input,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      setUrl(text);
    });
}
