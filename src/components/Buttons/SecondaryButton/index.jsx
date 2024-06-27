import { motion } from "framer-motion";

import cls from "./styles.module.scss";

export default function SecondaryButton({
  size = "medium",
  center,
  children,
  onClick,
  fullWidth,
  disabled,
  styles,
  classes = "",
  ...props
}) {
  return (
    <motion.div
      style={{ justifyContent: center ? "center" : "space-between", width: fullWidth ? "100%" : "", ...styles }}
      whileTap={{ scale: 0.9 }}
      className={`${cls.button} ${disabled ? cls.disabled : ""} ${cls[size]} ${classes}`}
      onClick={(e) => !disabled && onClick(e)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
