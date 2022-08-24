import React from "react";
// import { } from 'react-components-sutradhar'

export interface ButtonProps {
  label: string;
  fontSize: number | string
}

const Button = (props: ButtonProps) => {
  return <button>{props.label}</button>;
};

export default Button;