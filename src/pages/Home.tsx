import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { firestore } from "../firebase";
import Loading from "../common/Loading";
import ChatHeader from "../components/ChatHeader";
import Message from "../components/Message";
import ChatForm from "../components/ChatForm";
import style from "./Home.module.css";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const chatRef = useRef<HTMLElement>(null);
  const { user } = useAuthContext();
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = firestore
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot({
        next({ docs }) {
          setMessages(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        },
        error(error) {
          console.error(error);
          setError(error.message);
        },
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const chat = chatRef.current;
    if (chat) {
      const { scrollHeight, clientHeight } = chat;
      chat.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError("");
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  return !messages.length ? (
    <Loading />
  ) : (
    <div className={style.wrapper}>
      <div className={style.container}>
        <ChatHeader />
        <main className={style.main} ref={chatRef}>
          <div className={style.mainInner}>
            {messages.map((message) => {
              const { id, creatorId } = message;
              if (user?.uid === creatorId) {
                return <Message key={id} message={message} self />;
              } else {
                return <Message key={id} message={message} />;
              }
            })}
          </div>
        </main>
        {error && <p className={style.error}>{error}</p>}
        <ChatForm setError={setError} />
      </div>
    </div>
  );
}
