import style from "./Loading.module.css";

interface LoadingProps {
  init?: boolean;
}

export default function Loading({ init }: LoadingProps) {
  return (
    <div className={init ? style.initWrapper : style.wrapper}>
      {init && "Initialize..."}
    </div>
  );
}
