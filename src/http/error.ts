import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export type LaravelErrors = {
  message: string | null;
  errors: Record<string, string[]>;
}

const defaultErrors: LaravelErrors = {
  message: null,
  errors: {},
}

export const useLaravelErrors = (): [LaravelErrors, (errors: LaravelErrors) => void, () => void, (error: { field: string, message: string }) => void] => {
  const [errors, setErrors] = useState<LaravelErrors>(defaultErrors);
  const updateErrors = useCallback((newErrors: LaravelErrors) => setErrors(newErrors), []);
  const resetErrors = useCallback(() => setErrors(defaultErrors), []);
  const pushError = useCallback(({field, message}: { field: string, message: string }) => {
    setErrors((prev) => ({
      message: prev.message,
      errors: {
        ...prev.errors,
        [field]: [message],
      },
    }));

    toast.error(message);
  }, []);

  return [errors, updateErrors, resetErrors, pushError];
};