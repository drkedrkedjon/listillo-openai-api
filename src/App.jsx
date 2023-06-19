import "./App.css";
import { push, get, remove, set } from "firebase/database";
import { conversacionesRef } from "./scripts/firebase";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./scripts/firebase";

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

  function handleLogoff() {
    signOut(auth)
      .then(setIsLogged(false))
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, [isLogged]);

  return (
    <main className="main-container">
      {!isLogged && <Login setIsLogged={setIsLogged} />}
      {isLogged && (
        <>
          <header className="header-container">
            <h1>Chat with Listillo</h1>
            <button onClick={handleLogoff} className="btn">
              Logoff
            </button>
          </header>
          <section className="chat-container">
            <div className="chat-listillo">
              <p>Hola soy Listillo, que quieres tio de mi</p>
            </div>
            <div className="chat-usuario">
              <p>Ayuda meeee tiooo quiero beber vinoooo</p>
            </div>
          </section>
          <footer className="footer-container">
            <form className="send-message-container">
              <input
                className="message-input"
                type="text"
                placeholder="Write your message"
              />
              <button className="chat-btn">SEND</button>
            </form>
          </footer>
        </>
      )}
    </main>
  );
}

export default App;
