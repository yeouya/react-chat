import { auth } from "../firebase";
import { MdExitToApp } from "react-icons/md";
import style from "./ChatHeader.module.css";

export default function ChatHeader() {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header className={style.header}>
      <button className={style.button} onClick={handleLogout}>
        <MdExitToApp />
      </button>
    </header>
  );
}
