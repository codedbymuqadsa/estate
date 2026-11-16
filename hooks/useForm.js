'use client';

import { useCallback, useState } from 'react';
import { validate } from '@/lib/validation';

/**
 * Minimal controlled-form helper (no external form library).
 * Errors only appear for fields the user has touched or after a submit attempt.
 */
export function useForm(initialValues, schema) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const setField = useCallback(
    (name, value) => {
      setValues((v) => ({ ...v, [name]: value }));
      // Clear the error as soon as the user edits that field
      setErrors((e) => (e[name] ? { ...e, [name]: '' } : e));
    },
    []
  );

  const bind = (name) => ({
    name,
    value: values[name],
    onChange: (e) => setField(name, e.target.value),
    onBlur: () => {
      const message = schema[name]?.(values[name] ?? '', values);
      setErrors((e) => ({ ...e, [name]: message || '' }));
    },
    error: errors[name],
  });

  /** Validates every field. Returns true if the form is valid. */
  const check = useCallback(
    (fields) => {
      const subset = fields ? Object.fromEntries(fields.map((f) => [f, schema[f]]).filter(([, s]) => s)) : schema;
      const found = validate(values, subset);
      setErrors((e) => ({ ...e, ...Object.fromEntries(Object.keys(subset).map((k) => [k, found[k] || ''])) }));
      return Object.keys(found).length === 0;
    },
    [schema, values]
  );

  const reset = useCallback(
    (next = initialValues) => {
      setValues(next);
      setErrors({});
    },
    [initialValues]
  );

  return { values, errors, setField, setValues, bind, check, reset };
}
