import "./App.css";
import { push, get, remove, set } from "firebase/database";
import { conversacionesRef } from "./scripts/firebase";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./scripts/firebase";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [messageForm, setMessageForm] = useState("");
  const [conversacion, setConversacion] = useState([]);

  const instructionsObject = {
    role: "system",
    content:
      "You are highly knowledgeable assistant that is always happy to help.",
  };

  function handleSendMessage(event) {
    event.preventDefault();

    push(conversacionesRef, {
      role: "user",
      content: messageForm,
    });
    get(conversacionesRef).then((snapshot) => {
      const conversationArr = Object.values(snapshot.val());
      setConversacion(conversationArr);
      // conversationArr.unshift(instructionsObject);
      // console.log(conversationArr);
    });

    setMessageForm("");
  }

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

  const mapeo = conversacion.map((message, index) => (
    <div key={index} className="chat-usuario">
      <p>{message.content}</p>
    </div>
  ));

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
            {mapeo}
          </section>
          <footer className="footer-container">
            <form
              onSubmit={handleSendMessage}
              className="send-message-container"
            >
              <input
                className="message-input"
                type="text"
                placeholder="Write your message"
                value={messageForm}
                onChange={(e) => setMessageForm(e.target.value)}
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
