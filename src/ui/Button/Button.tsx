import s from "./Button.module.scss";

const Button = ({
  width,
  height,
  variant,
  text,
  disabled,
  onClick,
}: {
  width: number;
  height: number;
  variant: "cover" | "link";
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`${s.button} ${s[`button--${variant}`]} ${disabled && s[`button--disabled`]}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
