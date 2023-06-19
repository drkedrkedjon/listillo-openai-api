import "./App.css";
import { push, get, remove } from "firebase/database";
import conversationesRef from "./firebase";

// const conversationArr = [
//   {
//     role: "user",
//     content: "How are you today?...",
//   },
// ];

function App() {
  const instructionObject = {
    role: "system",
    content:
      "You are highly knowledgeable assistant that is always happy to help.",
  };

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
  // fetchApi();

  return <h1>Test</h1>;
}

export default App;
