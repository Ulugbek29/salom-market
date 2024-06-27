import React from "react";

import cls from "./styles.module.scss";

export default function PlusButton({ children, ...props }) {
  return (
    <div className={`${cls.button}`} {...props}>
      {children}
    </div>
  );
}
