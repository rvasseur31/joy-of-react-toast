import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useEscapeKey } from "../hooks/useEscapeKey";

const ToastContext = createContext();

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

export function ToastProvider({ children }) {
  const [toastMessage, setToastMessage] = useState("");
  const [selectedToastVariant, setSelectedToastVariant] = useState(
    VARIANT_OPTIONS[0]
  );
  const [toastStack, setToastStack] = useState([]);

  const handleNewToast = useCallback(() => {
    const nextToastStack = [
      ...toastStack,
      {
        id: Math.random(),
        message: toastMessage,
        variant: selectedToastVariant,
        onDismiss: handleDismissToast,
      },
    ];
    setToastStack(nextToastStack);
    setToastMessage("");
    setSelectedToastVariant(VARIANT_OPTIONS[0]);
  }, [selectedToastVariant, toastMessage, toastStack]);

  function handleDismissToast(id) {
    setToastStack((currentToastStack) =>
      currentToastStack.filter((toast) => toast.id !== id)
    );
  }

  const clearToasts = useCallback(() => {
    setToastStack([]);
  }, []);

  useEscapeKey(clearToasts);

  const value = useMemo(
    () => ({
      toastStack,
      toastMessage,
      selectedToastVariant,
      setToastMessage,
      setSelectedToastVariant,
      handleNewToast,
    }),
    [handleNewToast, selectedToastVariant, toastMessage, toastStack]
  );
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
}
