import { motion } from "framer-motion";

import cls from "./styles.module.scss";

export default function PrimaryButton({
  size = "medium",
  center,
  children,
  onClick,
  disabled,
  styles,
  classes = "",
  fullWidth,
  ...props
}) {
  return (
    <motion.button
      style={{ justifyContent: center ? "center" : "space-between" , ...styles }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`${cls.button} ${disabled ? cls.disabled : ""} ${cls[size]} ${classes}`}
      onClick={() => !disabled && onClick()}
      {...props}
    >
      {children}
    </motion.button>
  );
}
