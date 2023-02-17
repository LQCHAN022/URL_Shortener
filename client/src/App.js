import './App.css';

function App() {
  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <input className="UserInput"></input>
      <button className="SubmitButton">Shorten URL</button>
      <p className="GeneratedURL">Generated URL</p>
    </div>
  );
}

export default App;

async function ShortenURL(url) {
  let response = await fetch(
    "http://localhost:3000/shorten", 
    {
      method: "POST",
      body: {longUrl: url},
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const resJson = response.json();
}
