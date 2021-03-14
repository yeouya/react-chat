import { ReactNode, Dispatch, SetStateAction } from "react";

interface Props {
  children: ReactNode;
}

type SetState<T> = Dispatch<SetStateAction<T>>;

export type { Props, SetState };
