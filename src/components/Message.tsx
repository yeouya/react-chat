import { MdAccountCircle } from "react-icons/md";
import style from "./Message.module.css";

interface MessageProps {
  message: {
    text: string;
    createdAt: string;
    photoURL: string;
    name: string;
  };
  self?: boolean;
}

export default function Message({
  message: { text, createdAt, photoURL, name },
  self,
}: MessageProps) {
  return (
    <>
      <div className={`${style.wrapper} ${self && style.self}`}>
        {!self && (
          <>
            {photoURL ? (
              <img className={style.img} src={photoURL} alt="프로필 이미지" />
            ) : (
              <MdAccountCircle className={style.icon} />
            )}
            <p>{name}</p>
          </>
        )}
        <article className={style.article}>
          <p className={`${style.text} ${self && style.self}`}>{text}</p>
          <span className={style.timestamp}>{createdAt}</span>
        </article>
      </div>
    </>
  );
}
