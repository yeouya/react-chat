import style from "./AuthFormChange.module.css";

interface AuthFormChangeProps {
  signIn: boolean;
  handleFormChange(): void;
}

export default function AuthFormChange({
  signIn,
  handleFormChange,
}: AuthFormChangeProps) {
  return (
    <p className={style.paragraph}>
      {signIn ? "계정이 없으신가요?" : "계정이 있으신가요?"}
      <button className={style.button} type="button" onClick={handleFormChange}>
        {signIn ? "회원가입" : "로그인"}
      </button>
    </p>
  );
}
