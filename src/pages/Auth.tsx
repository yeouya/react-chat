import { useState, FormEvent } from "react";
import useInput from "../hooks/useInput";
import { auth, googleAuthProvider } from "../firebase";
import AuthForm from "../components/AuthForm";
import AuthFormChange from "../components/AuthFormChange";
import style from "./Auth.module.css";

export default function Auth() {
  const [nickname, setNickname, bindNickname] = useInput();
  const [email, setEmail, bindEmail] = useInput();
  const [password, setPassword, bindPassword] = useInput();
  const [signIn, setSignIn] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (signIn) {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        if (!nickname.trim()) {
          return;
        }
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        userCredential.user?.updateProfile({
          displayName: nickname,
        });
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleFormChange = () => {
    setSignIn((prev) => !prev);
    setNickname("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <AuthForm
          onSubmit={handleSubmit}
          signIn={signIn}
          bindNickname={bindNickname}
          bindEmail={bindEmail}
          bindPassword={bindPassword}
          handleGoogleAuth={handleGoogleAuth}
          error={error}
        />
        <AuthFormChange signIn={signIn} handleFormChange={handleFormChange} />
      </div>
    </div>
  );
}
