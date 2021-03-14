import { FormEvent } from "react";
import useInput from "../hooks/useInput";
import { useAuthContext } from "../contexts/AuthContext";
import { firebase, firestore } from "../firebase";
import { MdAdd, MdInsertEmoticon } from "react-icons/md";
import { HiOutlineHashtag } from "react-icons/hi";
import { SetState } from "../types";
import style from "./ChatForm.module.css";

interface ChatFormProps {
  setError: SetState<string>;
}

export default function ChatForm({ setError }: ChatFormProps) {
  const [text, setText, bindText] = useInput();
  const { user } = useAuthContext();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }
    setText("");
    try {
      await firestore.collection("messages").add({
        creatorId: user?.uid,
        createdAt: new Date().toLocaleTimeString().slice(0, -3),
        name: user?.displayName,
        text,
        photoURL: user?.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="button">
        <MdAdd />
      </button>
      <input className={style.input} type="text" {...bindText} />
      <button className={style.button} type="button">
        <MdInsertEmoticon />
      </button>
      <button className={style.button} type="button">
        <HiOutlineHashtag />
      </button>
    </form>
  );
}
