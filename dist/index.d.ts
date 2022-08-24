/// <reference types="react" />
interface ButtonProps {
    label: string;
    fontSize: number | string;
}
declare const Button: (props: ButtonProps) => JSX.Element;

export { Button as button };
