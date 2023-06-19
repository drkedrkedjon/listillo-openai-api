import "./App.css";
import { push, get, remove } from "firebase/database";
import { conversacionesRef } from "./scripts/firebase";
import { useState } from "react";
import Login from "./components/Login";

// const conversationArr = [
//   {
//     role: "user",
//     content: "How are you today?...",
//   },
// ];

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const instructionsObject = {
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
      body: JSON.stringify("Mi array de conversacion"),
    });
    const data = await response.json();
    console.log(data);
  }
  // fetchApi();

  return (
    <main className="main-container">
      {!isLogged && <Login setIsLogged={setIsLogged} />}
      {isLogged && (
        <>
          <header className="header-container">
            <h1>Chat with Listillo</h1>
            <button className="btn">Logoff</button>
          </header>
          <section className="chat-container">
            <div className="chat-listillo">
              <p>Hola soy Listillo, que quieres tio de mi</p>
            </div>
            <div className="chat-usuario">
              <p>Ayuda meeee tiooo quiero beber vinoooo</p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
