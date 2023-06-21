import "./App.css";
import { push, get, remove, onValue } from "firebase/database";
import { conversacionesRef } from "./scripts/firebase";
import { useEffect, useState, useRef } from "react";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./scripts/firebase";
import robot from "./assets/robot.jpg";

function App() {
  // State for if user is loged, Form control and conversation to render
  const [isLogged, setIsLogged] = useState(true);
  const [messageForm, setMessageForm] = useState("");
  const [conversacion, setConversacion] = useState([]);
  const scrollRef = useRef(null);

  // This is instructions object for OpenAI
  const instructionsObject = {
    role: "system",
    content:
      "You are highly knowledgeable assistant that is always happy to help.",
  };

  // Function to send message to firebase, then to retrive all messages and send to OpenAI and also to update the conversation state
  function handleSendMessage(event) {
    event.preventDefault();
    push(conversacionesRef, {
      role: "user",
      content: messageForm,
    });
    get(conversacionesRef).then((snapshot) => {
      const conversationArr1 = Object.values(snapshot.val());
      const conversationArr2 = Object.values(snapshot.val());
      setConversacion(conversationArr1);
      conversationArr2.unshift(instructionsObject);
      fetchApi(conversationArr2);
    });
    setMessageForm("");
  }

  // Function to sent data to OpenAI using Netlify Serveless Functions
  async function fetchApi(sendMessage) {
    const fetchUrl =
      "https://listillo-openai-api.netlify.app/.netlify/functions/openAiFetch";

    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendMessage),
    });
    const data = await response.json();
    push(conversacionesRef, data);
  }

  // Log off function
  function handleLogoff() {
    signOut(auth)
      .then(setIsLogged(false))
      .catch((error) => {
        console.log(error);
      });
  }

  // Check if user is logged, eventListener for firebase auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  // Cargar mensajes ya existentes al inicio y eventListener para firebase database
  useEffect(() => {
    const cancelOnValue = onValue(conversacionesRef, (snapshot) => {
      if (snapshot.val()) {
        const conversationArr = Object.values(snapshot.val());
        setConversacion(conversationArr);
      } else {
        setConversacion([]);
      }
    });
    return () => cancelOnValue();
  }, []);

  // Scroll to bottom of chat using scrollRef
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [conversacion]);

  // Map conversation to render
  const mapeo = conversacion.map((message, index) => (
    <div key={index} className={`chat-${message.role}`}>
      <p>{message.content}</p>
    </div>
  ));

  return (
    <main className="main-container">
      {!isLogged && <Login setIsLogged={setIsLogged} />}
      {isLogged && (
        <>
          <header className="header-container">
            <div>
              <h1>Chat with Listillo</h1>
              <div className="header-img">
                <img src={robot} alt="robot" />
                <button onClick={() => remove(conversacionesRef)}>
                  Start again
                </button>
              </div>
            </div>
            <button onClick={handleLogoff} className="btn">
              Logoff
            </button>
          </header>
          <section ref={scrollRef} className="chat-container">
            <div className="chat-assistant">
              <p>Hola soy Listillo, que quieres tio de mi</p>
            </div>
            {mapeo}
            <br />
            <br />
            <br />
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
