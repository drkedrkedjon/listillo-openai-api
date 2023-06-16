import "./App.css";

function App() {
  const conversationArr = [
    {
      role: "system",
      content:
        "You are highly knowledgeable assistant that is always happy to help.",
    },
    {
      role: "user",
      content: "How are you today?...",
    },
  ];

  async function fetchApi() {
    const fetchUrl =
      "https://listillo-openai-api.netlify.app/.netlify/functions/openAiFetch";

    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversationArr),
    });
    const data = await response.json();
    console.log(data);
  }

  fetchApi();
  return <h1>Test</h1>;
}

export default App;
