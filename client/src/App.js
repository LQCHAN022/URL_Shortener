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
  // console.log(user_input);
  // fetch('http://localhost:3000/sanity_check', {
  fetch('http://localhost:3000/shorten', {
    method: 'POST',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      longUrl: user_input,
    }),
  })
    .then((res) => {
      // console.log(res);
      return res.text();
    })
    .then((text) => {
      // console.log(text);
      setUrl(text);
    });
}
