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
      content: "La pregunta de usuario sobre bla bla...",
    },
  ];

  const jsn = JSON.stringify(conversationArr);
  const arr = JSON.parse(jsn);

  const json2 = JSON.stringify(arr);
  console.log(json2);

  const fetchUrl =
    "https://listillo-openai-api.netlify.app/.netlify/functions/openAiFetch";

  async function fetchApi() {
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

  // fetchApi();
  return <h1>Test</h1>;
}

export default App;
