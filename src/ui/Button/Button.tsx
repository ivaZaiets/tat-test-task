import s from "./Button.module.scss";

const Button = ({
  width,
  height,
  variant,
  text,
}: {
  width: number;
  height: number;
  variant: "cover" | "link";
  text: string;
}) => {
  return (
    <button
      className={`${s.button} ${s[`button--${variant}`]}`}
      style={{ width, height }}
    >
      {text}
    </button>
  );
};

export default Button;
