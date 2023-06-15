import "./App.css";

function App() {
  const url =
    "https://listillo-openai-api.netlify.app/.netlify/functions/openAiFetch";

  async function fetchApi() {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: "Jujuuuu",
    });
    const data = await response.json();
    console.log(data);
  }

  fetchApi();
  return <h1>Test</h1>;
}

export default App;
