import { useState, useCallback } from "react";

export interface LaravelErrors {
  message: string | null;
  errors: Record<string, string[]>;
}

const defaultErrors: LaravelErrors = {
  message: null,
  errors: {},
}

export const useLaravelErrors = (): [LaravelErrors, (errors: LaravelErrors) => void, () => void] => {
  const [errors, setErrors] = useState<LaravelErrors>(defaultErrors);
  const updateErrors = useCallback((newErrors: LaravelErrors) => setErrors(newErrors), []);
  const resetErrors = useCallback(() => setErrors(defaultErrors), []);

  return [errors, updateErrors, resetErrors];
};