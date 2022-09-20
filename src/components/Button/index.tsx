import React from "react";

export interface ButtonProps {
  label: string;
  fontSize: number | string;
  width: number | string;
}

const Button = (props: ButtonProps) => {
  return <button>{props.label}</button>;
};

export default Button;