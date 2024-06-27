import React from "react";

import cls from "./styles.module.scss";

export default function MinusButton({ children, ...props }) {
  return (
    <div className={`${cls.button}`} {...props}>
      {children}
    </div>
  );
}
