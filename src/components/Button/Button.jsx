import { cn } from "../../utills/utills";
import "./Button.css";

function Button(props) {
  const {
    onClick,
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button className={cn(
      "button",
      {},
      [className]
    )} type={type} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
