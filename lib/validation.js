import { EMAIL_RE, PHONE_RE } from './formatters';

export const rules = {
  name: (v) => (!v.trim() ? 'Please enter your full name.' : v.trim().length < 2 ? 'Name is too short.' : ''),
  email: (v) => (!v.trim() ? 'Please enter your email address.' : !EMAIL_RE.test(v.trim()) ? 'Enter a valid email address.' : ''),
  phone: (v) => (!v.trim() ? 'Please enter your phone number.' : !PHONE_RE.test(v.trim()) ? 'Enter a valid phone number.' : ''),
  phoneOptional: (v) => (v.trim() && !PHONE_RE.test(v.trim()) ? 'Enter a valid phone number.' : ''),
  message: (min = 10) => (v) =>
    !v.trim() ? 'Please write a message.' : v.trim().length < min ? `Please write at least ${min} characters.` : '',
  required: (label) => (v) => (!String(v).trim() ? `${label} is required.` : ''),
};

/** Runs a { field: validator } map against values and returns { field: errorMessage } for failures. */
export function validate(values, schema) {
  const errors = {};
  Object.entries(schema).forEach(([field, check]) => {
    const message = check(values[field] ?? '', values);
    if (message) errors[field] = message;
  });
  return errors;
}
