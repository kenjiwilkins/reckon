export const DEFAULT_PASSWORD_LENGTH = parseInt(
  process.env.NEXT_PUBLIC_DEFAULT_PASSWORD_LENGTH || "8"
);

export function validateEmail(email: string): boolean {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return false;
  }

  const beforeAt = email.slice(0, atIndex);
  const afterAt = email.slice(atIndex + 1);

  return beforeAt.length > 0 && afterAt.length > 0;
}

export function validatePasswordOnLogin(password: string): boolean {
  return password.length > 0;
}

export function passwordLongEnough(password: string) {
  return password.length >= DEFAULT_PASSWORD_LENGTH;
}

export function passwordHasNumber(password: string) {
  return /\d/.test(password);
}

export function passwordHasSpecialCharacter(password: string) {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
}

export function passwordHasMixedCase(password: string) {
  return /[a-z]/.test(password) && /[A-Z]/.test(password);
}

export function validatePasswordOnSignup(password: string): boolean {
  return (
    passwordLongEnough(password) &&
    passwordHasNumber(password) &&
    passwordHasSpecialCharacter(password) &&
    passwordHasMixedCase(password)
  );
}
