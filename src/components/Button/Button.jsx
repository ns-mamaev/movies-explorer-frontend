import { cn } from "../../utills/utills";
import "./Button.css";

export const BUTTON_COLOR = {
  default: "default",
  primary: "primary",
  secondary: "secondary",
  gradient: "gradient",
};

function Button(props) {
  const {
    onClick,
    className,
    children,
    text,
    color = BUTTON_COLOR.default,
    type = 'button',
    ...buttonProps
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn("button", {}, [className, `button_color_${color}`])}
      {...buttonProps}
    >
      {text || children}
    </button>
  );
}

export default Button;
