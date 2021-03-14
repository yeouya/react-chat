import { HTMLAttributes } from "react";
import { BindValue } from "../hooks/useInput";
import { FcGoogle } from "react-icons/fc";
import style from "./AuthForm.module.css";

interface AuthFormProps extends HTMLAttributes<HTMLFormElement> {
  signIn: boolean;
  bindNickname: BindValue;
  bindEmail: BindValue;
  bindPassword: BindValue;
  handleGoogleAuth(): void;
  error: string;
}

export default function AuthForm({
  signIn,
  bindNickname,
  bindEmail,
  bindPassword,
  handleGoogleAuth,
  error,
  ...restProps
}: AuthFormProps) {
  return (
    <form className={style.form} {...restProps}>
      <h1 className={style.heading}>React Chat</h1>
      <fieldset className={style.fieldset}>
        {!signIn && (
          <input
            className={style.input}
            type="text"
            title="닉네임 (영문 대소문자, 한글 사용 가능)"
            placeholder="닉네임"
            pattern="^[a-zA-z가-힣]+$"
            maxLength={8}
            required
            {...bindNickname}
          />
        )}
        <input
          className={style.input}
          type="email"
          title="이메일"
          placeholder="이메일"
          required
          {...bindEmail}
        />
        <input
          className={style.input}
          type="password"
          title="비밀번호"
          placeholder="비밀번호"
          required
          {...bindPassword}
        />
      </fieldset>
      {error && <p className={style.error}>{error}</p>}
      <div className={style.buttons}>
        <button className={style.button} type="submit">
          {signIn ? "로그인" : "회원가입"}
        </button>
        {signIn && (
          <>
            <p className={style.or}>또는</p>
            <button
              className={style.button}
              type="button"
              onClick={handleGoogleAuth}
            >
              <FcGoogle fontSize="2.2rem" />
              Google 계정으로 로그인
            </button>
          </>
        )}
      </div>
    </form>
  );
}
