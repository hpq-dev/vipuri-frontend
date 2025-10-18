export const isStrongPassword = (password: string) =>
  password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password);
