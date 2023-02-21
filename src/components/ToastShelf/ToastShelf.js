import React from "react";
import { useToastContext } from "../../contexts/ToastProvider";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toastStack } = useToastContext();
  return (
    <ol
      role="region"
      aria-live="assertive"
      aria-label="Notification"
      className={styles.wrapper}
    >
      {toastStack.map(({ id, variant, message, onDismiss }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast onDismiss={() => onDismiss(id)} variant={variant}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
