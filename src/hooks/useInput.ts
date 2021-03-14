import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";

export interface BindValue {
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

type UseInput = [string, Dispatch<SetStateAction<string>>, BindValue];

export default function useInput(initialValue = ""): UseInput {
  const [value, setValue] = useState(initialValue);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const bindValue = { value, onChange: handleChange };

  return [value, setValue, bindValue];
}
